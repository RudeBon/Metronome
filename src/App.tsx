import React from 'react'
import './App.css';
import ContainerComponent from './components/ContainerComponent';
import MobileStub from './components/MobileStub';

export default class App extends React.Component<{}> {
  public render() {
    return (
      <div className="App">
        <ContainerComponent />
      </div>
    );
  }
}