import { AppDispatch } from "@/store";
import { toggleBiometricModal } from "@/store/slices/authSlice";
import { Ionicons } from "@expo/vector-icons";
import * as LocalAuthentication from "expo-local-authentication";
import { AUTO_LOCK_TIME } from "./CONSTANTS";

export const handelTimerReset = (dispatch:AppDispatch) =>{
  console.log("reseting timer")
  return setTimeout(() => {
      console.log(
      "[LockOverlay] Inactivity timer expired — showing biometric modal"
    );
    dispatch(toggleBiometricModal(true));
    }, AUTO_LOCK_TIME)
}
export const checkBiometricAvailability = async () => {
    try {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      const enrolled = await LocalAuthentication.isEnrolledAsync();
      return compatible && enrolled;
    } catch (err) {
      console.error("Biometric check error:", err);
      return false;
    }
  };

export const startBiometricAuth = async (onSuccess :()=>void , onFail:()=>void) => {
    
  try {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: "Authenticate",
        cancelLabel: "Cancel",
        //fallbackLabel: "Use Password",
        disableDeviceFallback: true
      });

      if (result.success) {
        console.log("Here")
        onSuccess();
      } else {
        console.log("failed")
        onFail()
      }
    } catch (err) {
      console.error("Biometric authentication error:", err);
      onFail();
    }
  };

export function getFriendlyErrorMessage(error: unknown): string {
  if (!error) return "Something went wrong. Please try again.";

  const message = (error as Error)?.message || String(error);
//console.log("original Error message:", message);
  if (message.includes("Network")) return "Network error — please check your internet connection.";
  if (message.includes("400")) return "Invalid username or password.";
    if (message.includes("timeout")) return "The request took too long. Try again in a moment.";
  if (message.includes("401")) return "Your session has expired. Please log in again.";
  if (message.includes("403")) return "You don’t have permission to do that.";
  if (message.includes("404")) return "We couldn’t find what you’re looking for.";
  if (message.includes("500")) return "Server error — we’re working on fixing it.";

  return "Something went wrong. Please try again.";
}


export function getCategoryIcon(category: string): keyof typeof Ionicons.glyphMap {
  const map: Record<string, keyof typeof Ionicons.glyphMap> = {
    beauty: "color-palette-outline",
    fragrances: "flask-outline",
    furniture: "bed-outline",
    groceries: "cart-outline",
    "home-decoration": "home-outline",
    "kitchen-accessories": "restaurant-outline",
    laptops: "laptop-outline",
    "mens-shirts": "shirt-outline",
    "mens-shoes": "walk-outline",
    "mens-watches": "time-outline",
    "mobile-accessories": "headset-outline",
    motorcycle: "bicycle-outline",
    "skin-care": "leaf-outline",
    smartphones: "phone-portrait-outline",
    "sports-accessories": "football-outline",
    sunglasses: "sunny-outline",
    tablets: "tablet-portrait-outline",
    tops: "shirt-outline",
    vehicle: "car-outline",
    "womens-bags": "bag-outline",
    "womens-dresses": "body-outline",
    "womens-jewellery": "sparkles-outline",
    "womens-shoes": "walk-outline",
    "womens-watches": "time-outline",
  };

  return map[category] ?? "help-circle-outline";
}
