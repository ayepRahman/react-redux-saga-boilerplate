/*
  AdminValidatorsList
*/

import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { isEqual } from 'lodash';

import { injectIntl, FormattedMessage } from 'react-intl';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import Avatar from 'react-avatar';
import { push } from 'react-router-redux';
import { bindActionCreators, compose } from 'redux';
import { show as showModal } from 'redux-modal';

import { resultHasErrors, errorsToSingleMessage } from 'utils/graphql-errors';
import { camelizeApiResponseFragment } from 'utils/humps';

import Loading from 'ui/common/loading';
import Button from 'ui/common/button';
import Pagination from 'ui/common/pagination';
import Select from 'ui/common/rebranding/components/Select/Select';

import { Table } from 'reactstrap';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import SortableTableHeaderColumn from 'ui/common/sortable-table-header-column';

import {
  parseSortParameterURLValue,
  generateSortParameterURLValue,
  generateSortParameterGQLValue,
} from 'utils/sort';

import routeGenerators from 'ui/common/routes/generators';
import * as messages from './messages';
import * as actionTypes from 'store/graphql/AdminValidatorsList/action-types';
import {
  selectIsFetching,
  selectLeaderboard,
  selectMatchingValidators,
  selectValidatorsLeaderboardPaginationInfo,
} from 'store/graphql/AdminValidatorsList/selectors';

import AdminValidatorsListReducer from 'store/graphql/AdminValidatorsList/reducer';
import AdminRemoveValidatorModal from 'ui/graphql/AdminRemoveValidator/loadable';
import { MODAL_NAME as ADMIN_REMOVE_VALIDATOR_MODAL } from 'ui/graphql/AdminRemoveValidator';

import injectReducer from 'utils/injectReducer';

import classnames from 'classnames';
import styles from './index.module.scss';
import indorsedIcon from 'resources/common/indorsed.svg';
import flaggedIcon from 'resources/common/flagged.svg';
import SampleIcon from 'resources/brand/logo-icon.png';
import FiltersForm, { fieldNames as filtersFormFieldNames } from './filters-form';

const pageSizeOptions = '1,5,10,20,50'.split(',').map(Number);
const filtersFormFieldNamesList = Object.keys(filtersFormFieldNames).map(
  fieldName => filtersFormFieldNames[fieldName],
);

export class AdminValidatorsList extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentDidMount() {
    this.fetchLeaderboard(this.props);
  }

  componentDidUpdate(prevProps) {
    if (!isEqual(prevProps.routeParams, this.props.routeParams)) {
      this.fetchLeaderboard(this.props);
    }
  }

  onSortChange(sort) {
    const params = new URLSearchParams(this.props.location.search);
    params.set('sort', generateSortParameterURLValue(sort));
    this.props.history.push(`${this.props.location.pathname}?${params}`);
  }

  onPageChange(pageNumber) {
    const params = new URLSearchParams(this.props.location.search);
    params.set('page', pageNumber);
    this.props.history.push(`${this.props.location.pathname}?${params}`);
  }

  onPeriodChange(period) {
    const params = new URLSearchParams(this.props.location.search);
    params.set('period', period);
    this.props.history.push(`${this.props.location.pathname}?${params}`);
  }

  onCodingLanguageChange(codingLanguage) {
    const params = new URLSearchParams(this.props.location.search);
    params.set('coding-language', codingLanguage);
    this.props.history.push(`${this.props.location.pathname}?${params}`);
  }

  // ID-1632: Let admin search by username, email or ethereum address
  onFiltersFormSubmit(values) {
    const params = new URLSearchParams(this.props.location.search);
    Object.keys(values).forEach(fieldName => {
      params.set(fieldName, values[fieldName]);
    });
    params.set('page', 1);
    this.props.history.push(`${this.props.location.pathname}?${params}`);
  }

  onFiltersFormReset() {
    const params = new URLSearchParams(this.props.location.search);
    filtersFormFieldNamesList.forEach(fieldName => {
      params.delete(fieldName);
    });
    this.props.history.push(`${this.props.location.pathname}?${params}`);
  }

  async fetchLeaderboard(props) {
    const {
      client,
      routeParams,
      fetchLeaderboardStart,
      fetchLeaderboardSuccess,
      fetchLeaderboardError,
    } = props;
    fetchLeaderboardStart(routeParams);

    try {
      const response = await client.query({
        query: gql`
          query getLeaderboard(
            $pageNumber: Int
            $pageSize: Int
            $sort: String
            $period: Period
            $skill: String
            $search: String
          ) {
            getAdminValidatorsList(
              pageNumber: $pageNumber
              pageSize: $pageSize
              sort: $sort
              period: $period
              skill: $skill
              search: $search
            ) {
              leaderboard {
                user_id
                rewards
                vote_participation
                indorsed
                flagged
                consensus_percentage
                img_url
                username
                tier
              }
              matchingValidators
              totalValidators
            }
          }
        `,
        variables: {
          pageNumber: routeParams.currentPage,
          pageSize: routeParams.perPage,
          period: routeParams.period,
          skill: routeParams.codingLanguage,
          search: routeParams.filters['search'],
          sort: routeParams.sort
            ? generateSortParameterGQLValue(routeParams.sort)
            : generateSortParameterGQLValue({ field: 'rewards', order: 'desc' }),
        },
      });

      const { data, errors } = response;

      if (resultHasErrors({ errors })) {
        fetchLeaderboardError({ input: routeParams, error: errorsToSingleMessage({ errors }) });
      } else {
        const { leaderboard, totalValidators, matchingValidators } = data.getAdminValidatorsList;
        fetchLeaderboardSuccess({
          input: routeParams,
          result: {
            leaderboard: camelizeApiResponseFragment(leaderboard),
            totalValidators: totalValidators,
            matchingValidators: matchingValidators,
          },
        });
      }
    } catch (error) {
      fetchLeaderboardError({
        input: routeParams,
        error: error.message,
      });
    }
  }

  onPageSizeChange(pageSize) {
    const params = new URLSearchParams(this.props.location.search);
    params.set('page', 1);
    params.set('per-page', pageSize);
    this.props.history.push(`${this.props.location.pathname}?${params}`);
  }

  renderLeaderRow(leader, index) {
    const { showModal } = this.props;

    return leader ? (
      <tr className="align-items-center" key={leader.id}>
        <td className="align-middle">{index + 1}</td>
        <td className="align-middle py-4">
          <Link
            target="_blank"
            to={routeGenerators.admin.validators.details({ validator_id: leader.userId })}
          >
            <ul className="pointer">
              <li className="d-table-cell pr-3">
                <Avatar size={60} color="black" round src={leader.imgUrl || SampleIcon} />
              </li>
              <li className="d-table-cell">{leader.username}</li>
            </ul>
          </Link>
        </td>
        <td className="align-middle text-center">{leader.voteParticipation}</td>
        <td className="align-middle text-center">
          <Button svgIcon={indorsedIcon} iconPosition="suffix" className="cat-health gradient px-2">
            {leader.indorsed}
          </Button>
        </td>
        <td className="align-middle text-center">
          <Button
            svgIcon={flaggedIcon}
            iconPosition="suffix"
            className="cat-technology gradient px-2"
          >
            {leader.flagged}
          </Button>
        </td>
        <td className="align-middle text-center">{`${leader.consensusPercentage}%`}</td>
        <td className="align-middle text-center">{`USD${leader.rewards}`}</td>
        <td className="align-middle text-center">{`Tier ${leader.tier}`}</td>
        <td className="align-middle text-center" style={{ width: '25%' }}>
          <Button
            className="mr-2"
            to={routeGenerators.admin.validators.update({ validator_id: leader.userId })}
          >
            Edit
          </Button>

          <Button
            isReady={false}
            onClick={() =>
              showModal(ADMIN_REMOVE_VALIDATOR_MODAL, {
                validatorId: leader.userId,
                validatorUsername: leader.username,
              })
            }
          >
            Remove
          </Button>
        </td>
      </tr>
    ) : null;
  }

  renderPerPage() {
    const { pagination } = this.props;

    return (
      <UncontrolledDropdown>
        <DropdownToggle caret>{pagination.perPage} per page</DropdownToggle>
        <DropdownMenu>
          {pageSizeOptions.map(pageSize => (
            <DropdownItem
              key={`AdminValidatorsList-per-page-${pageSize}`}
              onClick={() => this.onPageSizeChange(pageSize)}
            >
              <FormattedMessage
                id="AdminValidatorsList.table.page-size-menu-item-text"
                defaultMessage={`{pageSize, number} {pageSize, plural,
            one {leader}
            other {leaders}
          } per page`}
                values={{ pageSize }}
              />
            </DropdownItem>
          ))}
        </DropdownMenu>
      </UncontrolledDropdown>
    );
  }

  renderSelectCodingLanguage() {
    const { routeParams } = this.props;
    const codingLanguages = [
      { text: 'Javascript', value: 'javascript' },
      { text: 'Java', value: 'java' },
      { text: 'C#', value: 'c#' },
      { text: 'C++', value: 'c++' },
      { text: 'PHP', value: 'php' },
      { text: 'Ruby', value: 'ruby' },
      { text: 'Python', value: 'python' },
      { text: 'Data Science', value: 'data science' },
      { text: 'Android', value: 'java_android' },
    ];
    return (
      <Select
        options={codingLanguages}
        placeholder="Coding language"
        onSelect={this.onCodingLanguageChange}
        value={routeParams.codingLanguage}
      />
    );
  }

  renderSelectPeriod() {
    const { routeParams } = this.props;
    const options = [
      { text: 'Last day', value: 'daily' },
      { text: 'Last week', value: 'weekly' },
      { text: 'Last month', value: 'monthly' },
      { text: 'Last year', value: 'yearly' },
    ];
    return (
      <Select
        options={options}
        placeholder="Duration"
        onSelect={this.onPeriodChange}
        value={routeParams.period}
      />
    );
  }

  render() {
    const {
      className,
      leaderboard,
      fetching,
      sort,
      intl: { formatMessage },
      routeParams,
      totalPages,
      filters,
    } = this.props;

    if (!leaderboard) return null;

    return (
      <div className={classnames(className, 'container py-5')}>
        <AdminRemoveValidatorModal />
        <div className="row">
          <div className="col-5 text-left pb-1">
            <h2>{formatMessage(messages.header.title)}</h2>
          </div>
        </div>

        <div className={classnames('row justify-content-left')}>
          <div className="col-5 py-3 d-flex flex-row">
            <div className="mr-2 pr-4">{this.renderSelectPeriod()}</div>
            <div className={classnames(styles.minWidthSelect)}>
              {this.renderSelectCodingLanguage()}
            </div>
          </div>

          <div className="col-7 py-3">
            <div className="d-flex flex-row-reverse">{this.renderPerPage()}</div>
          </div>
        </div>

        {fetching ? (
          <Loading />
        ) : (
          <div className="row">
            <div className="col-12">
              <FiltersForm
                className="pb-3"
                initialValues={filters}
                onSubmit={this.onFiltersFormSubmit}
                onReset={this.onFiltersFormReset}
              />
            </div>
            <div className="col-12">
              <Table className={classnames(styles.table)} responsive>
                <div className={classnames(styles.arrowRight)} />
                <thead>
                  <tr>
                    <th className="text-left">#</th>
                    <th className="text-left">{formatMessage(messages.table.validator)}</th>
                    <SortableTableHeaderColumn
                      name="vote_participation"
                      label={formatMessage(messages.table.voteParticipation)}
                      {...sort}
                      onChange={this.onSortChange}
                      className="text-center"
                    />
                    <SortableTableHeaderColumn
                      name="indorsed"
                      label={formatMessage(messages.table.indorsed)}
                      {...sort}
                      onChange={this.onSortChange}
                      className="text-center"
                    />
                    <SortableTableHeaderColumn
                      name="flagged"
                      label={formatMessage(messages.table.flagged)}
                      {...sort}
                      onChange={this.onSortChange}
                      className="text-center"
                    />
                    <SortableTableHeaderColumn
                      name="consensus_percentage"
                      label={formatMessage(messages.table.consensus)}
                      {...sort}
                      onChange={this.onSortChange}
                      className="text-center"
                    />
                    <SortableTableHeaderColumn
                      name="rewards"
                      label={formatMessage(messages.table.rewardEarned)}
                      {...sort}
                      onChange={this.onSortChange}
                      className="text-center"
                    />
                    <SortableTableHeaderColumn
                      name="tier"
                      label={formatMessage(messages.table.tier)}
                      {...sort}
                      onChange={this.onSortChange}
                      className="text-center"
                    />
                    <th className="text-center">{formatMessage(messages.table.actions)}</th>
                  </tr>
                </thead>
                <tbody>{leaderboard.map(this.renderLeaderRow)}</tbody>
              </Table>
            </div>
          </div>
        )}

        <div className="row justify-content-center pt-5 text-center">
          <Pagination
            paginationInfo={{
              currentPage: routeParams.currentPage,
              totalPages,
            }}
            className="py-4"
            onPageChange={pageNumber => this.onPageChange(pageNumber)}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const query = new URLSearchParams(ownProps.location.search);
  const routeParams = {
    currentPage: Number(query.get('page')) || 1,
    perPage: Number(query.get('per-page')) || 10,
    codingLanguage: query.get('coding-language') || null,
    period: query.get('period') || 'yearly',
    sort: parseSortParameterURLValue(query.get('sort')),
    triggerRefresh: query.get('trigger-refresh'),
    filters: filtersFormFieldNamesList.reduce((result, fieldName) => {
      result[fieldName] = query.get(fieldName);
      return result;
    }, {}),
  };

  const leaderboard = selectLeaderboard(state);
  const pagination = selectValidatorsLeaderboardPaginationInfo(state);
  const fetching = selectIsFetching(state);
  const matchingValidators = selectMatchingValidators(state);
  const totalPages = Math.ceil(matchingValidators / routeParams.perPage);

  return {
    routeParams,
    leaderboard,
    pagination,
    fetching,
    filters: routeParams.filters,
    sort: routeParams.sort,
    totalPages,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchLeaderboardStart: params =>
      dispatch({ type: actionTypes.FETCH_LEADERBOARD.START, payload: { params } }),
    fetchLeaderboardSuccess: ({ input, result }) =>
      dispatch({ type: actionTypes.FETCH_LEADERBOARD.SUCCESS, payload: { input, result } }),
    fetchLeaderboardError: ({ input, error }) =>
      dispatch({ type: actionTypes.FETCH_LEADERBOARD.FAILURE, payload: { input, error } }),
    push: bindActionCreators(push, dispatch),
    showModal: bindActionCreators(showModal, dispatch),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
const withReducer = injectReducer({
  key: 'AdminValidatorsList',
  reducer: AdminValidatorsListReducer,
});

export default withRouter(
  compose(
    withReducer,
    withConnect,
  )(injectIntl(withApollo(AdminValidatorsList))),
);
