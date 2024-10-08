import { useState, useEffect } from "react";
import css from "./DailyNormaModal.module.css";
import Icons from "../Icons/Iсons.jsx";
import { useDispatch, useSelector } from "react-redux";
import { refreshUser, updateUserWaterDailyNorma } from "../../redux/auth/operations";
import { fetchTodayWater } from "../../redux/mainWater/operations";
import { getMonthWater } from "../../redux/monthWater/monthWaterThunk";
import { selectWaterRate } from "../../redux/auth/selectors";
const DailyNormaModal = ({ onClose }) => {
  const [gender, setGender] = useState("female");
  const [weight, setWeight] = useState("");
  const [activityTime, setActivityTime] = useState("");
  const [dailyNorm, setDailyNorm] = useState(0.0);
  const [waterToDrink, setWaterToDrink] = useState("");
  const dispatch = useDispatch();

  const waterRate = useSelector(selectWaterRate);

useEffect(() => {
  console.log("Modal is open, blocking scroll");
  document.body.classList.add("modal-open");

  return () => {
    console.log("Modal is closed, unblocking scroll");
    document.body.classList.remove("modal-open");
  };
}, []);



useEffect(() => {
  // Цей useEffect спрацює після оновлення waterNorma в Redux-стані
}, [waterRate]);

useEffect(() => {
  const mass = parseFloat(weight);
  const time = parseFloat(activityTime) || 0; 
  if (!isNaN(mass) && mass > 0) {
    let volume = 0;

    if (gender === "female") {
      volume = (mass * 0.03 + time * 0.4) * 1000;  
    } else if (gender === "male") {
      volume = (mass * 0.04 + time * 0.6) * 1000;
    }

    setDailyNorm((volume / 1000).toFixed(1));  
    setWaterToDrink((volume / 1000).toFixed(1));
  } else {
    setDailyNorm(0.0);
    setWaterToDrink(0.0);
  }
}, [gender, weight, activityTime]);


  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const handleWeightChange = (e) => {
    const value = e.target.value;
    if (value === "" || (Number(value) >= 0 && Number(value) <= 250)) {
      setWeight(value);
    }
  };

  const handleActivityTimeChange = (e) => {
    const value = e.target.value;
    if (value === "" || Number(value) >= 0) {
      setActivityTime(value);
    }
  };

  const handleWaterToDrinkChange = (e) => {
    const value = e.target.value;
    if (value === "" || Number(value) >= 0) {
      setWaterToDrink(value);
    }
  };

const handleSave = async (e) => {
  e.preventDefault();

  if (waterToDrink) {
    try {
      dispatch(updateUserWaterDailyNorma(waterToDrink * 1000));
      dispatch(fetchTodayWater());
      onClose();
    } catch (error) {
      console.error("Error saving daily norma:", error);
      alert("Failed to save daily norma. Please try again.");
    }
    return;
  }

  if (!gender) {
    alert("Please select your gender.");
    return;
  }
  if (!weight || isNaN(weight) || weight <= 0) {
    alert("Please enter a valid weight.");
    return;
  }
  if (isNaN(activityTime) || activityTime < 0) {
    alert("Please enter a valid activity time.");
    return;
  }

  try {
    const mass = parseFloat(weight);
    const time = parseFloat(activityTime) || 0; 
    let volume = 0;
    
    if (gender === "female") {
      volume = (mass * 0.03 + time * 0.4) * 1000;  
    } else if (gender === "male") {
      volume = (mass * 0.04 + time * 0.6) * 1000;
    }

    const calculatedNorm = (volume / 1000).toFixed(1);

    dispatch(updateUserWaterDailyNorma(calculatedNorm * 1000));
    dispatch(fetchTodayWater());
    onClose();
  } catch (error) {
    console.error("Error saving daily norma:", error);
    alert("Failed to save daily norma. Please try again.");
  }
};


  const handleOutsideClick = (event) => {
    if (event.target.classList.contains(css.modal)) {
      onClose();
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      onClose();
    }
  };
  
  document.addEventListener('keydown', handleKeyDown);

  return (
    <div className={css.modal} onClick={handleOutsideClick}>
      <div className={css.BoxModal} onClick={(e) => e.stopPropagation()}>
        <div className={css.modalHeader}>
          <h2 className={css.normaTitleModal}>My daily norma</h2>
          <div className={css.offBtn} onClick={onClose}>
            <Icons id="x-mark" width={24} height={24} className="icon-blue" />
          </div>
        </div>
        <div>
          <div className={css.normaFormula}>
            <p className={css.normaParagraph}>
              For woman: <span>V=(M*0.03) + (T*0.4)</span>
            </p>
            <p className={css.normaParagraph}>
              For man: <span>V=(M*0.04) + (T*0.6)</span>
            </p>
          </div>
          <div className={css.normaExplanation}>
            <p className={css.explanationText}>
              <span>*</span> V is the volume of the water norm in liters per
              day, M is your body weight in kilograms, T is the time of active
              sports or other high-physical-load activities in hours (set to 0
              if none).
            </p>
          </div>
        </div>
        <div className={css.normaFormCont}>
          <form className={css.normaForm} onSubmit={handleSave}>
            <div className={css.normaFormRadio}>
              <p className={css.normaTitleModal}>Calculate your rate:</p>
              <label>
                <input
                  className={css.normaInputRadio}
                  type="radio"
                  name="gender"
                  value="female"
                  checked={gender === "female"}
                  onChange={handleGenderChange}
                />
                <span>For woman</span>
              </label>
              <label>
                <input
                  className={css.normaInputRadio}
                  type="radio"
                  name="gender"
                  value="male"
                  checked={gender === "male"}
                  onChange={handleGenderChange}
                />
                <span>For man</span>
              </label>
            </div>
            <div>
              <p className={css.normaParagraph}>Your weight in kilograms:</p>
              <input
                className={css.normaInput}
                type="number"
                min="0"
                max="250"
                placeholder="0"
                value={weight}
                onChange={handleWeightChange}
              />
            </div>
            <div>
              <p className={css.normaParagraph}>
                The time of active participation in sports or other activities
                with high physical load in hours:
              </p>
              <input
                className={css.normaInput}
                type="number"
                min="0"
                placeholder="0"
                value={activityTime}
                onChange={handleActivityTimeChange}
              />
            </div>
            <div className={css.normaFormResult}>
              The required amount of water in liters per day:
              <strong>{" " + dailyNorm + " L"}</strong>
            </div>
            <div>
              <p className={css.normaTitleModal}>
                Write down how much water you will drink:
              </p>
              <input
                className={css.normaInput}
                type="number"
                placeholder="0"
                // value={waterToDrink}
                onChange={handleWaterToDrinkChange}
              />
            </div>
            <button
              type="submit"
              className={css.normaButton}
              onClick={handleSave}
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DailyNormaModal;
