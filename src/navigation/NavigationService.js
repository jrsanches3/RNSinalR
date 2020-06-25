import { NavigationAction } from '@react-navigation/native';

let _navigator;

function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

function navigate(routeName, params) {
  _navigator.dispatch(
    NavigationAction.navigate({
      routeName,
      params,
    }),
  );
}

function reset(routeName, params) {
  _navigator.dispatch(
    NavigationAction.reset({
      routeName,
      params,
    }),
  );
}

function back() {
  _navigator.dispatch(NavigationAction.back());
}

export default {
  navigate,
  back,
  reset,
  setTopLevelNavigator,
};
