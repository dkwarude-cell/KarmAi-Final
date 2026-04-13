/**
 * INTEGRATION EXAMPLE FOR NEW COMPONENTS
 *
 * This file shows how to integrate the three new glassmorphism components
 * into App.tsx with the UniversalBottomSheet
 */

import { useState } from "react";
import CreatorStudio from "./components/CreatorStudio";
import PhotoProofModal from "./components/PhotoProofModal";
import PlaceReviews from "./components/PlaceReviews";
import UniversalBottomSheet from "./components/UniversalBottomSheet";

// Example integration in App.tsx component

export default function AppIntegrationExample() {
  // State management
  const [showCreatorStudio, setShowCreatorStudio] = useState(false);
  const [showPhotoProof, setShowPhotoProof] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState<any>(null);

  // Mock place data
  const mockPlaceData = {
    name: "Cafe Coffee Day - ICT Campus",
    averageRating: 4.6,
    totalReviews: 127,
  };

  // Handlers
  const handleWriteReview = () => {
    console.log("Open review writing modal");
    // You can open another modal or navigate to a review form
  };

  const handlePhotoVerify = (photoUrl: string) => {
    console.log("Photo verified:", photoUrl);
    // Award karma points, update check-in status, etc.
  };

  return (
    <div className="relative w-full h-screen">
      {/* Your existing app content */}

      {/* 1. CREATOR STUDIO - For Club Admins */}
      <CreatorStudio
        isOpen={showCreatorStudio}
        onClose={() => setShowCreatorStudio(false)}
        clubName="Photography Club"
      />

      {/* 2. PHOTO PROOF MODAL - GPS Anti-Gaming */}
      <PhotoProofModal
        isOpen={showPhotoProof}
        onClose={() => setShowPhotoProof(false)}
        placeName={mockPlaceData.name}
        distance={75} // in meters
        onVerify={handlePhotoVerify}
      />

      {/* 3. UNIVERSAL BOTTOM SHEET WITH PLACE REVIEWS */}
      <UniversalBottomSheet
        isOpen={selectedMarker !== null}
        onClose={() => setSelectedMarker(null)}
        height="large"
        showReviews={true}
        placeData={mockPlaceData}
        reviewsContent={
          <PlaceReviews
            placeName={mockPlaceData.name}
            averageRating={mockPlaceData.averageRating}
            totalReviews={mockPlaceData.totalReviews}
            onWriteReview={handleWriteReview}
          />
        }
      >
        {/* Details Tab Content */}
        <div>
          <div className="flex items-start gap-3 mb-3">
            <div className="w-2 h-2 rounded-full mt-1.5 bg-[#00CBA4]" />
            <div className="flex-1">
              <h3 className="text-[#1A1A1A] font-bold mb-1" style={{ fontSize: "16px" }}>
                {mockPlaceData.name}
              </h3>
              <div
                className="inline-block px-2 py-1 rounded-full mb-2"
                style={{
                  backgroundColor: "rgba(0, 203, 164, 0.1)",
                  fontSize: "10px",
                  fontWeight: 500,
                  color: "#00CBA4",
                }}
              >
                cafe
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 mb-4 text-[#6B7280]" style={{ fontSize: "12px" }}>
            <span>0.3 km away</span>
            <span>•</span>
            <span className="text-[#7C5CE8]">91% bubble-match</span>
          </div>

          {/* AI WHY THIS? Section */}
          <div
            className="mb-4 p-4 rounded-xl"
            style={{
              background: "rgba(124, 92, 232, 0.06)",
              border: "1px solid rgba(124, 92, 232, 0.12)",
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[#7C5CE8] font-bold" style={{ fontSize: "11px", letterSpacing: "0.5px" }}>
                🎯 WHY THIS?
              </span>
            </div>
            <p className="text-[#1A1A1A]" style={{ fontSize: "13px", lineHeight: "1.6" }}>
              This cafe bridges your Photography and Philosophy interests. 3 students from Fine Arts are here now.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => setShowPhotoProof(true)}
              className="flex-1 h-12 rounded-xl border text-[#00CBA4] font-medium flex items-center justify-center gap-2"
              style={{
                borderColor: "#00CBA4",
                backgroundColor: "rgba(0, 203, 164, 0.05)",
                fontSize: "14px",
              }}
            >
              Check-in
            </button>
            <button
              className="flex-1 h-12 rounded-xl bg-[#7C5CE8] text-white font-medium"
              style={{ fontSize: "14px" }}
            >
              Add to drift
            </button>
          </div>
        </div>
      </UniversalBottomSheet>

      {/* Example trigger buttons (for testing) */}
      <div className="absolute top-20 left-4 space-y-2 z-50">
        <button
          onClick={() => setShowCreatorStudio(true)}
          className="px-4 py-2 bg-white rounded-lg shadow-md"
        >
          Open Creator Studio
        </button>
        <button
          onClick={() => setShowPhotoProof(true)}
          className="px-4 py-2 bg-white rounded-lg shadow-md"
        >
          Open Photo Proof
        </button>
        <button
          onClick={() => setSelectedMarker({ name: "Test Place" })}
          className="px-4 py-2 bg-white rounded-lg shadow-md"
        >
          Open Place Details + Reviews
        </button>
      </div>
    </div>
  );
}

/**
 * STEP-BY-STEP INTEGRATION INTO YOUR EXISTING APP.TSX:
 *
 * 1. Add state variables:
 *    const [showCreatorStudio, setShowCreatorStudio] = useState(false);
 *    const [showPhotoProof, setShowPhotoProof] = useState(false);
 *
 * 2. Add the components before the closing </motion.div> of your main app container
 *
 * 3. Update your existing UniversalBottomSheet call (around line 787) to include reviews:
 *    <UniversalBottomSheet
 *      isOpen={selectedMarker !== null && !showAnalytics}
 *      onClose={() => setSelectedMarker(null)}
 *      height="large"
 *      showReviews={true}
 *      placeData={{
 *        name: selectedMarker?.name || "",
 *        averageRating: 4.6,
 *        totalReviews: 127,
 *      }}
 *      reviewsContent={
 *        <PlaceReviews
 *          placeName={selectedMarker?.name || ""}
 *          averageRating={4.6}
 *          totalReviews={127}
 *          onWriteReview={() => console.log("Write review")}
 *        />
 *      }
 *    >
 *      {/* Your existing details content */}
 *    </UniversalBottomSheet>
 *
 * 4. Add Creator Studio button in header (for club admins only):
 *    {userProfile.isClubAdmin && (
 *      <motion.button
 *        onClick={() => setShowCreatorStudio(true)}
 *        className="w-11 h-11 rounded-full flex items-center justify-center border bg-white"
 *        style={{
 *          borderColor: "#7C5CE8",
 *          boxShadow: "0 1px 3px rgba(124,92,232,0.2)",
 *        }}
 *      >
 *        <Wand2 size={18} className="text-[#7C5CE8]" />
 *      </motion.button>
 *    )}
 *
 * 5. Replace your existing CheckInVerification with PhotoProofModal:
 *    <PhotoProofModal
 *      isOpen={showCheckIn}
 *      onClose={() => setShowCheckIn(false)}
 *      placeName={checkInPlace?.name || ""}
 *      distance={75}
 *      onVerify={(photoUrl) => {
 *        handleCheckInComplete();
 *        console.log("Verified with photo:", photoUrl);
 *      }}
 *    />
 *
 * 6. Import the new components at the top of App.tsx:
 *    import CreatorStudio from "./components/CreatorStudio";
 *    import PhotoProofModal from "./components/PhotoProofModal";
 *    import PlaceReviews from "./components/PlaceReviews";
 *
 * 7. Don't forget to import Wand2 from lucide-react if using the Creator Studio button
 */
