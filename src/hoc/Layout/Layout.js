import React, { useState, useCallback } from "react";
import { connect } from "react-redux";

import SearchMenu from "../../containers/SearchMenu/SearchMenu";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import DetailsPanel from "../../components/DetailsPanel/DetailsPanel";
import OptionsMenu from "../../containers/OptionsMenu/OptionsMenu";
import ErrorModal from '../../components/ErrorModal/ErrorModal';
import LoadingScreen from '../../components/LoadingScreen/LoadingScreen';

import * as actionTypes from "../../store/actions/actionTypes";

const styles = {
  content: { height: "calc(100% - 60px)" },
};

const Layout = (props) => {
  const [searchMenu, setSearch] = useState(false);
  const [optionsMenu, setOptions] = useState(false);
  const [detailsMenu, setdetailsMenu] = useState(false);
  const [nodeId, setNodeId] = useState("");

  const searchClosedHandler = useCallback(() => {
    setSearch(false);
  }, []);

  const searchClickedHandler = useCallback(() => {
    setSearch(true);
    setOptions(false);
    setdetailsMenu(false);
  }, []);

  const optionsClosedHandler = useCallback(() => {
    setOptions(false);
  }, []);

  const optionsClickedHandler = useCallback(() => {
    setOptions(true);
    setSearch(false);
    setdetailsMenu(false);
  }, []);

  const { switchClearGraph } = props;
  const clearGraph = useCallback(() => {
    switchClearGraph(true);
  }, [switchClearGraph]);

  const detailsPanelOpenedHandler = useCallback((id) => {
    setdetailsMenu(true);
    setOptions(false);
    setSearch(false);
    setNodeId(id);
  }, []);

  const detailsPanelClosedHandler = useCallback(() => {
    setdetailsMenu(false);
  }, []);

  return (
    <React.Fragment>
      <SearchMenu
        search={searchMenu}
        searchClosed={searchClosedHandler}
      ></SearchMenu>
      <OptionsMenu
        options={optionsMenu}
        optionsClosed={optionsClosedHandler}
      ></OptionsMenu>
      <DetailsPanel
        detailsClosed={detailsPanelClosedHandler}
        details={detailsMenu}
        nodeId={nodeId}
      />
      <Toolbar
        searchClick={searchClickedHandler}
        optionsClick={optionsClickedHandler}
        clearGraph={clearGraph}
      ></Toolbar>
      <main style={styles.content}>
        {React.cloneElement(props.children, {
          detailsMenuHandler: detailsPanelOpenedHandler,
        })}
      </main>
      { props.showError &&
      <ErrorModal/>}
      { props.loading &&
      <LoadingScreen/>}
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    clr: state.clearNodes,
    showError: state.ui.errorModal.error,
    loading: state.ui.loadingScreen.loading
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    switchClearGraph: (isActive) =>
      dispatch({ type: actionTypes.CLEAR_NODES, bool: isActive }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
