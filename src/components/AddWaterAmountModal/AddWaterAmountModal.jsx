import css from "./AddWaterAmountModal.module.css"
import { useDispatch, useSelector } from "react-redux";
// import ErrorMsg from "../ErrorMsg/ErrorMsg";
// import Loader from "../Loader/Loader.jsx"
// import { NavLink } from "react-router-dom";
import { IoCloseOutline } from "react-icons/io5";
import { HiOutlinePlusSmall, HiOutlineMinusSmall } from "react-icons/hi2";
import TimeDropdown from "../TimeDropdown/TimeDropDown.jsx";

// import Modal from "react-modal";


// Modal.setAppElement('#root');

// const customStyles = {
//   content: {
//     top: '50%',
//     left: '50%',
//     right: 'auto',
//     bottom: 'auto',
//     marginRight: '-50%',
//     transform: 'translate(-50%, -50%)',
//   },
//   overlay: {
//     background: 'rgba(0, 0, 0, 0.8)',
//   },
// };

const initialState = { 
    modal: {
        isModalOpen: false,
        waterAmount: 0,
        enteredTime: '',
        },
}
     
export const incrementWaterAmount = () => ({
    type: 'INCREMENT_WATER_AMOUNT',
});

export const decrementWaterAmount = () => ({
    type: 'DECREMENT_WATER_AMOUNT',
});

export const setEnteredTime = (time) => ({
    type: 'SET_TIME',
    payload: time,
});

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'INCREMENT_WATER_AMOUNT':
            return {
                ...state,
                modal: {
                    ...state.modal, waterAmount: state.modal.waterAmount + 1
                },
            };
        case 'DECREMENT_WATER_AMOUNT':
            return {
                ...state,
                modal: {
                    ...state.modal, waterAmount: Math.max(0, state.modal.waterAmount - 1),
                },
            };
        case 'SET_TIME':
            return {
                ...state,
                modal: {
                    ...state.modal,
                    enteredTime: action.payload,
                }
            };
        default: return state;
    }
};

// const initialState = { waterLog: [] };

// const waterSlice = createSlice({
//     name: 'waterAmount',
//     initialState,
//     reducers: {
//         addWaterLog: (state, action) => { state.waterLog.push(action.payload); },
//         changeWaterlog: (state, action) => {state.waterLog}
//     }
// });

// export const { addWaterLog, changeWaterlog } = waterSlice.actions;

// export default waterSlice.reducer;

// function waterAmount(
//     const waterLog = useSelector(state => state.water.waterLog)
// );

// const dispatch = useDispatch();

// const handleAddwater = (amount) => {
//     dispatch(addWaterLog({ amount, time: newDate().getTime() }));
// };


// const rootReducer = (state = initialState, action) => {
//   return state;
// };
// в store записуємо стан і редюсер




export default function AddWaterAmountModal({ water: { amount, id } }) {
    // const waterValue = useSelector(state => state.water.value);

    //  const isModalOpen = useSelector(selectIsModalOpen);
    // const isError = useSelector(selectError);
    // const isLoading = useSelector(selectLoading);
    const dispatch = useDispatch();

    // const handleAddWater = () => dispatch(addWaterAmount(id));

    const waterAmount = useSelector(state => state.modal.waterAmount);

    const enterdTime = useSelector(state => state.modal.enteredTime);

    const handleTimeChange = (event) => {
        dispatch(setEnteredTime(event.target.value))
    }
    
    const handleCloseModal = () => dispatch(toggleWaterModal());
//   useEffect(() => {
//     dispatch(fetchContacts())
//   }, [dispatch])

  return (
      
    <div className={css.backdrop} onClick={handleCloseModal}>
      <div className={css.modal}>
      {/* <Modal style={customStyles}> */}
      {/* {isError && <ErrorMsg/>} */}
      {/* <NavLink className={css.close}><IoCloseOutline /></NavLink> */}
      {/* {isLoading && <Loader />} */}
      <div className={css.titlecontainer}>
        <h2 className={css.titletext}>Add water</h2>
        <span className={css.closebtn} onClick={handleCloseModal}><IoCloseOutline size="24" color="407BFF" /></span>
      </div>    
      <h3 className={css.subtitle}>Choose a value:</h3>
      <p className={css.signaturetext}>Amount of water:</p>
      <div className={css.waterInputcontainer}>
        <button className={css.amountButton}type="button" onClick={() => dispatch(decrementWaterAmount())}><HiOutlineMinusSmall size="24" color="407BFF" /></button>
        <p className={css.amountWaterIncome}>{waterAmount}</p>
        <button className={css.amountButton} type="button" onClick={() => dispatch(incrementWaterAmount)}><HiOutlinePlusSmall size="24" color="407BFF" /></button>
      </div>
     
      <p className={css.signaturetext}>Recording time:</p>
      <div className={css.timeDropdown}><TimeDropdown/></div>
      <h3 className={css.subtitle}>Enter the value of the water used:</h3>
      <input className={css.waterAmount} type="text" onChange={handleWaterAmountChange}/>
      <div className={css.footerContainer}>
        <p className={css.amountWaterIncomeFooter}>{waterAmount}</p>
        <button className={css.saveButton} type="button" onClick={handleAddWaterChanges}>Save</button>
      </div>
        {/* </Modal> */}
        </div>
    </div>
   
  );
}

// to={backLinkRef.current} 

// onClick={() => dispatch(closeWindow())}