import React from "react";
import { usePizzaStore } from "./store/pizzaStore";
import { ingredientsData } from "./data/ingredients";
import PizzaCanvas from "./components/3d/PizzaCanvas";
import DraggableWindow from "./components/ui/DraggableWindow";

const App: React.FC = () => {
  const {
    base,
    setBase,
    sauce,
    setSauce,
    cheese,
    setCheese,
    selectedVeggies,
    toggleVeggie,
    selectedProteins,
    toggleProtein,
    resetPizza,
  } = usePizzaStore();

  const allSelectedIds = [
    base?.id,
    sauce?.id,
    cheese?.id,
    ...selectedVeggies.map((v) => v.id),
    ...selectedProteins.map((p) => p.id),
  ].filter(Boolean) as string[];

  const totalPrice = allSelectedIds.reduce((sum, id) => {
    const item = ingredientsData.find((i) => i._id === id);
    return sum + (item ? Number(item.price) : 0);
  }, 0);

  const handleOrderSubmit = () => {
    alert(`Visualized Pizza Ready! Total Price: ₹${totalPrice.toFixed(2)} \n\nThis is a standalone visualizer so actual orders are disabled in this view.`);
  };

  const getCategory = (cat: string) =>
    ingredientsData.filter((i) => i.category === cat);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <div className="container mx-auto p-6 relative">
        <h1 className="text-4xl font-extrabold text-[var(--color-pizzaSystem-dark)] mb-10">
          The <span className="text-[var(--color-pizzaSystem-red)]">Pizza Workshop</span>
        </h1>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Left side::The Selections */}
          <div className="w-full md:w-2/3 flex flex-col gap-6 max-h-[85vh] overflow-y-auto pr-4 custom-scrollbar">
            {/* Pizza base */}
            <section className="bg-white p-5 rounded-xl shadow-sm">
              <h2 className="text-xl font-bold mb-3 border-b-2 border-gray-100 pb-2">
                1. Select Crust
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {getCategory("base").map((item) => (
                  <button
                    key={item._id}
                    onClick={() => setBase(item._id, item.name)}
                    className={`p-3 border-2 rounded-lg cursor-pointer transition-colors ${base?.id === item._id ? "border-[var(--color-pizzaSystem-orange)] bg-orange-50" : "border-gray-200 hover:border-gray-300"}`}
                  >
                    <span className="font-bold">{item.name}</span>
                    <span className="text-green-600 text-sm block">
                      +₹{item.price}
                    </span>
                  </button>
                ))}
              </div>
            </section>

            {/* Sauces */}
            <section className="bg-white p-5 rounded-xl shadow-sm">
              <h2 className="text-xl font-bold mb-3 border-b-2 border-gray-100 pb-2">
                2. Select Sauce
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {getCategory("sauce").map((item) => (
                  <button
                    key={item._id}
                    onClick={() => setSauce(item._id, item.name)}
                    className={`p-3 border-2 rounded-lg cursor-pointer transition-colors ${sauce?.id === item._id ? "border-[var(--color-pizzaSystem-red)] bg-red-50" : "border-gray-200 hover:border-gray-300"}`}
                  >
                    <span className="font-bold">{item.name}</span>
                    <span className="text-green-600 block text-sm">
                      +₹{item.price}
                    </span>
                  </button>
                ))}
              </div>
            </section>

            {/* Cheeses */}
            <section className="bg-white p-5 rounded-xl shadow-sm">
              <h2 className="text-xl font-bold mb-3 border-b-2 border-gray-100 pb-2">
                3. Select Cheese
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {getCategory("cheese").map((item) => (
                  <button
                    key={item._id}
                    onClick={() => setCheese(item._id, item.name)}
                    className={`p-3 border-2 rounded-lg cursor-pointer transition-colors ${cheese?.id === item._id ? "border-yellow-400 bg-yellow-50" : "border-gray-200 hover:border-gray-300"}`}
                  >
                    <span className="font-bold">{item.name}</span>
                    <span className="text-green-600 block text-sm">
                      +₹{item.price}
                    </span>
                  </button>
                ))}
              </div>
            </section>

            {/* Veggies */}
            <section className="bg-white p-5 rounded-xl shadow-sm">
              <h2 className="text-xl font-bold mb-3 border-b-2 border-gray-100 pb-2">
                4. Veggies
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {getCategory("veggie").map((item) => (
                  <button
                    key={item._id}
                    onClick={() => toggleVeggie(item._id, item.name)}
                    className={`p-3 border-2 rounded-lg cursor-pointer transition-colors ${selectedVeggies.some((v) => v.id === item._id) ? "border-green-500 bg-green-50" : "border-gray-200 hover:border-gray-300"}`}
                  >
                    <span className="font-bold text-sm block truncate" title={item.name}>{item.name}</span>
                    <span className="text-green-600 block text-xs">
                      +₹{item.price}
                    </span>
                  </button>
                ))}
              </div>
            </section>

            {/* Proteins */}
            <section className="bg-white p-5 rounded-xl shadow-sm mb-10">
              <h2 className="text-xl font-bold mb-3 border-b-2 border-gray-100 pb-2">
                5. Proteins
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {getCategory("protein").map((item) => (
                  <button
                    key={item._id}
                    onClick={() => toggleProtein(item._id, item.name)}
                    className={`p-3 border-2 rounded-lg cursor-pointer transition-colors ${selectedProteins.some((p) => p.id === item._id) ? "border-amber-500 bg-amber-50" : "border-gray-200 hover:border-gray-300"}`}
                  >
                    <span className="font-bold text-sm block truncate" title={item.name}>{item.name}</span>
                    <span className="text-green-600 block text-xs">
                      +₹{item.price}
                    </span>
                  </button>
                ))}
              </div>
            </section>
          </div>

          {/* Right side::Order Cart */}
          <div className="w-full md:w-1/3">
            <div className="bg-[var(--color-pizzaSystem-dark)] text-white p-6 rounded-xl sticky top-8 shadow-2xl">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold">🍕 Summary</h3>
                <button onClick={resetPizza} className="text-xs text-gray-400 hover:text-white underline cursor-pointer">Reset</button>
              </div>

              <ul className="space-y-3 mb-6 border-b border-gray-600 pb-6 min-h-[150px]">
                {/* Show selected Base */}
                {base && (
                  <li className="flex justify-between items-center bg-gray-800 p-2 rounded">
                    <span>{base.name}</span>
                    <span className="font-mono">
                      ₹{ingredientsData.find((i) => i._id === base.id)?.price}
                    </span>
                  </li>
                )}

                {/* show selected Sauce */}
                {sauce && (
                  <li className="flex justify-between items-center bg-gray-800 p-2 rounded">
                    <span>{sauce.name}</span>
                    <span className="font-mono">
                      ₹{ingredientsData.find((i) => i._id === sauce.id)?.price}
                    </span>
                  </li>
                )}

                {/* show selected Cheese */}
                {cheese && (
                  <li className="flex justify-between items-center bg-gray-800 p-2 rounded">
                    <span>{cheese.name}</span>
                    <span className="font-mono">
                      ₹{ingredientsData.find((i) => i._id === cheese.id)?.price}
                    </span>
                  </li>
                )}

                {/* show selected Veggies */}
                {selectedVeggies.map((veggie) => {
                  const item = ingredientsData.find((i) => i._id === veggie.id);
                  return item ? (
                    <li
                      key={veggie.id}
                      className="flex justify-between text-gray-300 pl-2 text-sm"
                    >
                      <span>+ {item.name}</span>
                      <span className="font-mono">₹{item.price}</span>
                    </li>
                  ) : null;
                })}

                {/* show selected proteins */}
                {selectedProteins.map((protein) => {
                  const item = ingredientsData.find((i) => i._id === protein.id);
                  return item ? (
                    <li
                      key={protein.id}
                      className="flex justify-between text-amber-300 pl-2 text-sm"
                    >
                      <span>+ {item.name}</span>
                      <span className="font-mono">₹{item.price}</span>
                    </li>
                  ) : null;
                })}

                {/* Empty State */}
                {!base &&
                  !sauce &&
                  !cheese &&
                  selectedVeggies.length === 0 &&
                  selectedProteins.length === 0 && (
                    <div className="flex items-center justify-center h-full pt-10 text-gray-400 text-sm">
                      Start building your pizza...
                    </div>
                  )}
              </ul>

              {/* total price calculations */}
              <div className="flex justify-between items-end mb-6">
                <span className="text-xl font-bold text-gray-300">Total</span>
                <span className="text-4xl font-black text-green-400 font-mono">
                  ₹{totalPrice.toFixed(2)}
                </span>
              </div>

              {/* Checkout button */}
              <button
                onClick={handleOrderSubmit}
                disabled={!base || !sauce || !cheese}
                className="w-full bg-[var(--color-pizzaSystem-red)] text-white py-4 rounded-xl font-bold text-lg hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-lg active:scale-95 duration-150"
              >
                {!base || !sauce || !cheese
                  ? "Select Base, Sauce & Cheese"
                  : "Complete Build"}
              </button>
            </div>
          </div>
        </div>

        {/* Main hovering draggable window for vision */}
        <DraggableWindow>
          <PizzaCanvas />
        </DraggableWindow>
      </div>
    </div>
  );
};

export default App;
