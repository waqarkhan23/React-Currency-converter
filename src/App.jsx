import { useState } from "react";
import Usecurrencyinfo from "./hooks/Usecurrencyinfo";
import "./App.css";
import InputBox from "./components/InputBox";

function App() {
  const [amount, setAmount] = useState(0);
  const [fromCurrency, setFromCurrency] = useState("usd");
  const [toCurrency, setToCurrency] = useState("pkr");
  const [convertedAmount, setConvertedAmount] = useState(0);

  const currencyInfo = Usecurrencyinfo(fromCurrency);
  const currencyOptions = Object.keys(currencyInfo);

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setAmount(convertedAmount);
    setConvertedAmount(amount);
  };

  const handleAmountChange = (newAmount) => {
    setAmount(newAmount);
  };

  const handleFromCurrencyChange = (currency) => {
    setFromCurrency(currency);
  };

  const handleToCurrencyChange = (currency) => {
    setToCurrency(currency);
  };

  const convertCurrency = () => {
    setConvertedAmount(amount * currencyInfo[toCurrency]);
  };

  return (
    <div
      className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url('https://e0.pxfuel.com/wallpapers/607/828/desktop-wallpaper-day-trading.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            convertCurrency();
          }}
        >
          <div className="w-full mb-1">
            <InputBox
              label="From"
              amount={amount}
              currencyOptions={currencyOptions}
              onCurrencyChange={handleFromCurrencyChange}
              selectCurrency={fromCurrency}
              onAmountChange={handleAmountChange}
            />
          </div>
          <div className="relative w-full h-0.5">
            <button
              type="button"
              className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
              onClick={swapCurrencies}
            >
              Swap
            </button>
          </div>
          <div className="w-full mt-1 mb-4">
            <InputBox
              label="To"
              amount={convertedAmount}
              currencyOptions={currencyOptions}
              onCurrencyChange={handleToCurrencyChange}
              selectCurrency={toCurrency}
              amountDisable
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg"
          >
            Convert {fromCurrency.toUpperCase()} to {toCurrency.toUpperCase()}
          </button>
        </form>
      </div>
    </div>
  );
}
export default App;
