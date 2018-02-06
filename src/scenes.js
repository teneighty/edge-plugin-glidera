import React from 'react';
import {core, ui} from 'edge-libplugin'
import {userInterface} from './api/user'

const LoadingView = (props) => {
  return (
    <div className="block text-center">
      Loading...
    </div>)
}

export class HomeScene extends React.Component {
  componentDidMount() {
    const check = async () => {
      var account = await core.readData('account')
      ui.title('Authenticating');
      console.log(account)
      if (account && account.accessKey) {
        userInterface.requestAccessToken(function(success, results) {
          success
            ? this.props.history.push('/dashboard')
            : this.props.history.push('/authorize')
        });
      } else {
        let disclaimer = await core.readData('disclaimer')
        if (disclaimer) {
          this.props.history.push('/authorize')
        } else {
        core.writeData('disclaimer', false)
          this.props.history.push('/disclaimer')
        }
      }
    }
    check()
  }
  render() {
    return (<LoadingView />)
  }
}

export class DisclaimerScene extends React.Component {
  continueSignup = () => {
    this.props.history.push('/authorize')
    core.writeData('disclaimer', true);
  }
  cancelSignup = () => {
  }
  render() {
    return (
      <div>
        <div className="block alertBlock">
            <h4>Edge Disclaimer</h4>
            <p>You are now signing up for Glidera, a third party exchange service.  Your personal information is transmitted to Glidera Inc. directly.</p>
            <p>A copy of your information will be encrypted and stored locally for your future use.</p>
            <p>Edge will never have access to your personal information which is encrypted on your device.</p>
        </div>

        <div className="text-center">
          <form name="form">
            <div className="row text-right">
              <div className="col-xs-12">
                <button type="button" onClick={this.cancelSignup} className="btn btn-lg btn-link">Cancel</button>
                <button type="button" onClick={this.continueSignup} className="btn btn-lg btn-success">I Understand</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}
export const AuthController = (props) => {
  return (<div>AuthController</div>)
}
export const VerifyEmailScene = (props) => {
  return (<div>VerifyEmailScene</div>)
}
export const VerifyPhoneScene = (props) => {
  return (<div>VerifyPhoneScene</div>)
}
export const VerifyTwoFactorScene = (props) => {
  return (<div>VerifyTwoFactorScene</div>)
}
export const DashboardScene = (props) => {
  return (
    <div>
      <div className="block alertBlock">
        <p>To start buying or selling bitcoin, please complete account verification steps</p>
        <div className="text-center">
          <button>Go to Verification Steps</button>
        </div>
      </div>
      <div className="block">
        <h5>Conversion Rate</h5>
        <p>1 BTC = $14,488.25</p>
      </div>
      <div className="block">
        <h5>Recent Transactions</h5>
        <p>You don't have any transactions yet. To start buying or selling bitcoin, please complete account verification.</p>
      </div>
      <div className="block">
        <h5>My Glidera Account</h5>
        <p><a href="">View my account</a></p>
      </div>
      <div className="block">
        <h5>Support</h5>
        <p>Please contact Glidera at <a href="mailto:support@glidera.com">support@glidera.com</a></p>
      </div>
    </div>
  )
}
export const OrderReviewScene = (props) => {
  return (<div>OrderReviewScene</div>)
}
export const OrderScene = (props) => {
  return (<div>OrderScene</div>)
}
export const ReceiptScene = (props) => {
  return (<div>ReceiptScene</div>)
}
export const TransactionsScene = (props) => {
  return (<div>TransactionsScen</div>)
}
export const ExecuteOrderScene = (props) => {
  return (<div>ExecuteOrderScene</div>)
}
export const AccountScene = (props) => {
  return (<div>AccountScene</div>)
}
export const BankAccountScene = (props) => {
  return (<div>BankAccountScene</div>)
}
export const IncreaseLimitScene = (props) => {
  return (<div>IncreaseLimitScene</div>)
}
export const IdVerifyScene = (props) => {
  return (<div>IdVerifyScene</div>)
}
export const ErrorScene = (props) => {
  return (<div>ErrorScene</div>)
}

