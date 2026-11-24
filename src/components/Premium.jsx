import axios from "axios";
import { BASE_URL } from "../utils/constants";
const Premium = () => {
  const handleBuyClick = async (type) => {
    const order = await axios.post(
      BASE_URL + "/payment/create",
      { membershipType: type },
      { withCredentials: true },
    );
    const {amount,keyId,currency,notes,orderId,email}=order.data;
    const options = {
      key: keyId, 
      amount,
      currency,
      name: "Dev Tinder",
      description: "Connect with developers and find your perfect match.",
      order_id:orderId, // This is the order_id created in the backend
      prefill: {
        name: notes.firstName + " " + notes.lastName,
        email: email,
      },
      theme: {
        color: "#F37254",
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-12">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-white tracking-tight">
          Choose Your <span className="text-amber-400">Membership</span>
        </h1>
        <p className="text-slate-400 mt-2 text-sm sm:text-base">
          Unlock unlimited networking, verified badges, and direct messaging.
        </p>
      </div>

      {/* Cards Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full items-center">
        {/* SILVER MEMBERSHIP CARD */}
        <div className="card bg-base-300 border border-slate-600/50 rounded-2xl p-8 shadow-xl hover:border-slate-400 transition-all duration-300">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-slate-200">
              Silver Membership
            </h2>
            <span className="badge badge-outline text-slate-300">Starter</span>
          </div>

          <div className="my-6">
            <span className="text-4xl font-extrabold text-white">₹299</span>
            <span className="text-slate-400 text-sm"> / 3 months</span>
          </div>

          <ul className="space-y-3 text-slate-300 mb-8 flex-1">
            <li className="flex items-center gap-3">
              <span className="text-emerald-400 font-bold">✓</span> Chat with
              other people
            </li>
            <li className="flex items-center gap-3">
              <span className="text-emerald-400 font-bold">✓</span> 100
              connection requests per day
            </li>
            <li className="flex items-center gap-3">
              <span className="text-emerald-400 font-bold">✓</span> Blue Tick
              verification
            </li>
            <li className="flex items-center gap-3">
              <span className="text-emerald-400 font-bold">✓</span> 3 Months
              validity
            </li>
          </ul>

          <button
            onClick={() => handleBuyClick("silver")}
            className="btn w-full bg-slate-200 hover:bg-white text-slate-900 font-bold border-none"
          >
            Buy Silver
          </button>
        </div>

        {/* GOLD MEMBERSHIP CARD */}
        <div className="relative card bg-gradient-to-b from-amber-950/30 via-base-300 to-base-300 border-2 border-amber-400/80 rounded-2xl p-8 shadow-2xl shadow-amber-500/10 md:scale-105 transition-all duration-300">
          {/* Popular Badge */}
          <div className="absolute -top-3.5 right-6 bg-gradient-to-r from-amber-400 to-yellow-500 text-black text-xs font-extrabold uppercase px-3 py-1 rounded-full shadow-md">
            Most Popular
          </div>

          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-extrabold bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500 bg-clip-text text-transparent">
              Gold Membership
            </h2>
          </div>

          <div className="my-6">
            <span className="text-4xl font-extrabold text-white">₹499</span>
            <span className="text-amber-200/70 text-sm"> / 6 months</span>
          </div>

          <ul className="space-y-3 text-slate-200 mb-8 flex-1">
            <li className="flex items-center gap-3">
              <span className="text-amber-400 font-bold">✓</span> Chat with
              other people
            </li>
            <li className="flex items-center gap-3">
              <span className="text-amber-400 font-bold">✓</span> 200 connection
              requests per day
            </li>
            <li className="flex items-center gap-3">
              <span className="text-amber-400 font-bold">✓</span> Blue Tick
              verification
            </li>
            <li className="flex items-center gap-3">
              <span className="text-amber-400 font-bold">✓</span> 6 Months
              validity
            </li>
          </ul>

          <button
            onClick={() => handleBuyClick("gold")}
            className="btn w-full bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-black font-extrabold border-none shadow-lg shadow-amber-500/20"
          >
            Buy Gold
          </button>
        </div>
      </div>
    </div>
  );
};

export default Premium;
