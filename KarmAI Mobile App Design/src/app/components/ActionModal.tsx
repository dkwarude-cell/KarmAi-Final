import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, ExternalLink, CheckCircle, Clock, Search, MapPin, Tag, Check, Star } from "lucide-react";
import { useState } from "react";

interface ActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  actionType: string;
  placeName: string;
}

export default function ActionModal({ isOpen, onClose, actionType, placeName }: ActionModalProps) {
  const [step, setStep] = useState(0);

  if (!isOpen) return null;

  const renderContent = () => {
    switch (actionType) {
      case "order":
        return (
          <div className="p-5">
            <h3 className="font-bold text-lg mb-4 text-[#1A1A1A]">Popular at {placeName}</h3>
            <div className="space-y-3">
              {[
                { id: 1, name: "Paneer Tikka Combo", price: 120, time: "10-15 mins" },
                { id: 2, name: "Cold Coffee", price: 60, time: "5 mins" },
                { id: 3, name: "Masala Dosa", price: 90, time: "15 mins" }
              ].map((item) => (
                <div key={item.id} className="flex justify-between items-center p-3 rounded-xl border border-gray-100 bg-white shadow-sm">
                  <div>
                    <h4 className="font-bold text-sm text-gray-800">{item.name}</h4>
                    <p className="text-xs text-gray-500 mt-1 flex gap-2">
                       <span className="flex items-center gap-1"><Clock size={12}/>{item.time}</span>
                    </p>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="font-bold text-[#FF6B35]">₹{item.price}</span>
                    <button onClick={() => setStep(1)} className="mt-2 px-3 py-1 bg-[#FF6B35]/10 text-[#FF6B35] rounded-full text-xs font-bold w-full text-center">Add</button>
                  </div>
                </div>
              ))}
            </div>
            {step === 1 && (
              <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="mt-6 p-4 rounded-xl bg-[#00CBA4]/10 border border-[#00CBA4]/20 flex justify-between items-center">
                <div>
                  <h4 className="font-bold text-[#00CBA4] text-sm">Order Added</h4>
                  <p className="text-xs text-[#00CBA4]/80">Proceed to checkout?</p>
                </div>
                <button onClick={() => { alert('Order placed! Simulation complete.'); onClose() }} className="px-4 py-2 bg-[#00CBA4] text-white rounded-lg text-xs font-bold shadow-md shadow-[#00CBA4]/20">Pay Now</button>
              </motion.div>
            )}
          </div>
        );
      
      case "register":
        return (
          <div className="p-5">
            <h3 className="font-bold text-lg mb-2 text-[#1A1A1A]">Event Registration</h3>
            <p className="text-sm text-gray-500 mb-6">You are registering for the event at <span className="font-bold text-[#7C5CE8]">{placeName}</span>.</p>
            
            <div className="bg-[#7C5CE8]/5 p-4 rounded-xl mb-6 border border-[#7C5CE8]/10">
              <div className="flex gap-2 items-center mb-3">
                 <CheckCircle size={16} className="text-[#7C5CE8]" /> <span className="text-sm font-medium text-gray-800">Auto-filled: Priya Raut (Design + Tech)</span>
              </div>
              <div className="flex gap-2 items-center">
                 <CheckCircle size={16} className="text-[#7C5CE8]" /> <span className="text-sm font-medium text-gray-800">Fee: Free for Members</span>
              </div>
            </div>
            
            <button onClick={() => { alert('Registered for Event! Added to your calendar.'); onClose() }} className="w-full py-3 bg-[#7C5CE8] text-white rounded-xl font-bold shadow-lg shadow-[#7C5CE8]/20 transition-transform active:scale-95 flex items-center justify-center gap-2">
              Confirm Registration <Check size={18} />
            </button>
          </div>
        );
        
      case "book":
        return (
          <div className="p-5">
             <h3 className="font-bold text-lg mb-4 text-[#1A1A1A]">Book a Table</h3>
             <p className="text-sm text-gray-500 mb-6">Select your preferred time slot for <span className="font-bold text-[#333344]">{placeName}</span>.</p>
             
             <div className="grid grid-cols-2 gap-3 mb-6">
                <button className="py-2.5 rounded-lg border border-[#00CBA4] bg-[#00CBA4]/10 text-[#00CBA4] font-bold text-sm text-center">Tdy 7:00 PM</button>
                <button className="py-2.5 rounded-lg border border-gray-200 text-gray-500 font-bold text-sm text-center hover:bg-gray-50">Tdy 7:30 PM</button>
                <button className="py-2.5 rounded-lg border border-gray-200 text-gray-500 font-bold text-sm text-center hover:bg-gray-50">Tdy 8:00 PM</button>
                <button className="py-2.5 rounded-lg border border-gray-200 text-gray-500 font-bold text-sm text-center hover:bg-gray-50">Tdy 8:30 PM</button>
             </div>
             
             <div className="space-y-4">
               <button onClick={() => { alert('Booking Confirmed! You secured a table.'); onClose() }} className="w-full py-3 bg-[#333344] text-white rounded-xl font-bold shadow-lg flex items-center justify-center gap-2 transition-transform active:scale-95">
                 Confirm Booking
               </button>
             </div>
          </div>
        );
        
      default:
        return (
          <div className="p-6 flex flex-col items-center justify-center text-center h-48">
            <ExternalLink size={40} className="text-gray-300 mb-4" />
            <h3 className="font-bold text-gray-700">Opening External Flow</h3>
            <p className="text-sm text-gray-500">Redirecting you to the {actionType} partner portal for {placeName}...</p>
            <button onClick={onClose} className="mt-4 px-4 py-2 bg-gray-100 rounded-lg text-sm font-medium">Cancel</button>
          </div>
        );
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[300] bg-black/50 backdrop-blur-sm flex items-end sm:items-center justify-center"
        onClick={onClose}
      >
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="w-full sm:max-w-md bg-white rounded-t-3xl sm:rounded-3xl overflow-hidden pb-safe"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-4 border-b border-gray-100 flex items-center justify-between">
            <button onClick={onClose} className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full text-gray-700">
               <ArrowLeft size={18} />
            </button>
            <span className="font-bold text-gray-800 tracking-wide text-sm uppercase">{actionType}</span>
            <div className="w-8 h-8"></div> {/* Spacer */}
          </div>
          
          <div className="max-h-[70vh] overflow-y-auto">
            {renderContent()}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}