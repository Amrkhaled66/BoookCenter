import { useAddToCartValidation } from "src/hooks/useCart";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { FiMinus } from "react-icons/fi";

function QuantitySelector({ id, quantity, onModify }) {
  const [currQuantity, setCurrQuantity] = useState(quantity);
  const [inputValue, setInputValue] = useState(quantity.toString());
  const { mutate, isPending } = useAddToCartValidation();

  const handleAdd = () => {
    const newQuantity = currQuantity + 1;
    mutate(
      { id, quantity: newQuantity },
      {
        onSuccess: () => {
          onModify(id, newQuantity);
          setCurrQuantity(newQuantity);
          setInputValue(newQuantity.toString());
        },
        onError: () => {
          setInputValue(quantity.toString());
          setCurrQuantity(quantity);
        },
      },
    );
  };

  const handleDecrease = () => {
    if (currQuantity === 1) return;
    const newQuantity = currQuantity - 1;

    mutate(
      { id, quantity: newQuantity },
      {
        onSuccess: () => {
          onModify(id, newQuantity);
          setCurrQuantity(newQuantity);
          setInputValue(newQuantity.toString());
        },
        onError: () => {
          setInputValue(quantity.toString());
          setCurrQuantity(quantity);
        },
      },
    );
  };

  return (
    <div className="flex w-fit items-center justify-start rounded-xl border-2 border-main-color sm:justify-center">
      <button
        onClick={handleAdd}
        disabled={isPending}
        className="px-2 disabled:cursor-not-allowed lg:px-3"
      >
        {isPending ? <Loader width={15} heigh={15} /> : <FaPlus />}
      </button>
      <input
        type="number"
        value={inputValue}
        disabled
        min={1}
        className="no-arrows max-w-10 bg-main-color p-2 text-center font-cairo text-xs font-bold text-white transition-all duration-300 focus:border-main-text--color focus:outline-none sm:text-base"
      />
      <button
        disabled={currQuantity == 1 || isPending}
        onClick={handleDecrease}
        className="px-2 disabled:cursor-not-allowed lg:px-3"
      >
        {isPending ? <Loader width={15} heigh={15} /> : <FiMinus />}
      </button>
    </div>
  );
}

export default QuantitySelector;
