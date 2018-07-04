import React, { Component } from 'react'
import Header from './components/Header'
import Account from './models/Account'
import Match from './models/Match'
import AccountsPage from './components/AccountsPage'
import MatchesPage from './components/MatchesPage'
import './App.css'
import './primer.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activePage: 'accounts'
    }
    this.db = {}
    this.db.accounts = Account.setupDatabase()
    this.db.matches = Match.setupDatabase()
  }

  loadMatchesForAccount = accountID => {
    this.setState(prevState => ({ activeAccountID: accountID, activePage: 'matches' }))
  }

  renderActivePage = () => {
    const { activePage, activeAccountID } = this.state

    if (activePage === 'matches') {
      return (
        <MatchesPage
          accountID={activeAccountID}
          dbMatches={this.db.matches}
        />
      )
    }
    return (
      <AccountsPage
        dbAccounts={this.db.accounts}
        loadMatchesForAccount={this.loadMatchesForAccount}
      />
    )
  }

  changeActivePage = activePage => {
    this.setState(prevState => ({ activePage }))
  }

  render() {
    const { activePage, activeAccountID } = this.state

    return (
      <div className="layout-container">
        <Header
          activePage={activePage}
          activeAccountID={activeAccountID}
          onPageChange={this.changeActivePage}
        />
        {this.renderActivePage()}
      </div>
    )
  }
}

export default App
