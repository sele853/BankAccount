import { useReducer } from "react";
function reducer(state,action)
{
    switch(action.type)
    {
      case 'openAccount':
        if(state.isActive) return state;
        return{
          ...state,
          balance:500,
          isActive:true
        }
      case 'deposit':
        if(!state.isActive) return state;
        return{
          ...state,
          balance:state.balance+action.payload,
        }
      case 'withdraw':
        if(!state.isActive || state.balance < 50 )  return state;
        return{
          ...state,
          balance:state.balance - action.payload,
        }
      case 'requestLoan':
        if(!state.isActive || state.loan >0) return state;
        return{
          ...state,
          balance:state.balance + action.payload,
          loan:action.payload,

        }
      case 'payLoan':
        if(!state.isActive || state.loan === 0) return state;
        return{
          ...state,
          balance:state.balance - state.loan,
          loan:0,

        }
      case 'closeAccount':
        if(!state.isActive || state.loan > 0 || state.balance !== 0) return state;
        return initialState;
      default:
        return initialState;
    }
}

const initialState = {
  balance: 0,
  loan: 0,
  isActive: false
};

export default function App() {
  const [{balance,loan,isActive},dispatch] = useReducer(reducer,initialState);
  return (
    <div className="App">
      <h1>Bank Account</h1>
      <p>Balance: {balance}</p>
      <p>Loan: {loan}</p>

      <p>
        <button onClick={() => dispatch({type:'openAccount'})} disabled={isActive}>
          Open account
        </button>
      </p>
      <p>
      <button onClick={() => dispatch({type:'deposit',payload:150})} disabled={!isActive}>
          deposit 150
        </button>
        
      </p>
      <p>
        <button onClick={() => dispatch({type:'withdraw' , payload:50})} disabled={!isActive}>
          Withdraw 50
        </button>
      </p>
      <p>
        <button onClick={() => dispatch({type:'requestLoan',payload:5000})} disabled={!isActive}>
          Request a loan of 5000
        </button>
      </p>
      <p>
        <button onClick={() => dispatch({type:'payLoan'})} disabled={!isActive}>
          Pay loan
        </button>
      </p>
      <p>
        <button onClick={() => dispatch({type:'closeAccount'})} disabled={!isActive}>
          Close account
        </button>
      </p>
    </div>
  );
}
