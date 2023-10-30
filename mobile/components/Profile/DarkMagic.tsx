import { LinearGradient } from "expo-linear-gradient";
import { View } from "react-native";

export function DarkMagic() {
  return (
    <>
      {/* <View className="bg-[#5865F2] bg-[#2457F5] bg-[#1877F2] bg-gradient-to-br from-red-500 via-purple-700 to-cyan-500 bg-black bg-black bg-gradient-to-br from-rose-400 to-fuchsia-800 via-cyan-500 bg-[#191414] bg-gradient-to-r from-sky-400 to-indigo-600 bg-[#3FAEE8] bg-black bg-[#9146FF] bg-[#1DA1F2] bg-[bg-black] hidden w-0 h-0" /> */}

      <View className="w-5 h-5 bg-[#5865F2]" />

      <View className="w-5 h-5  bg-[#2457F5] " />
      <View className="w-5 h-5  bg-[#1877F2]" />
      <LinearGradient
        colors={["#FF7061", "#A033FF", "#09F"]}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 1.3 }}
        style={{ borderRadius: 8, width: 100, height: 50 }}
      />
      <LinearGradient
        colors={["#1400C8", "#B900B4", "#F50000"]}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={{ borderRadius: 8, width: 100, height: 50 }}
      />
      <LinearGradient
        colors={["#08BBFF", "#2B75FF"]}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
        style={{ borderRadius: 8, width: 100, height: 50 }}
      />
      <View className="w-5 h-5 bg-black" />

      <View className="w-5 h-5 bg-[#191414]" />

      <View className="w-5 h-5 bg-[#3FAEE8]" />

      <View className="w-5 h-5 bg-black" />

      <View className="w-5 h-5 bg-[#9146FF]" />

      <View className="w-5 h-5 bg-[#1DA1F2]" />

      <View className="w-5 h-5 bg-black" />
    </>
  );
}
