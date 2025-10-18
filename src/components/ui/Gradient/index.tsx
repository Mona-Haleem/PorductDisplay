import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "@/utils/Theme/ThemeContext";

type GradientProps = {
  style?: object;
  children: React.ReactNode;
};
function Gradient({
  style = { flex: 1, hight: "100%", width: "100%" ,padding:15},
  children,
}: GradientProps) {
  const { theme } = useTheme();
  //console.log("Rendering Gradient");
  return (
    <LinearGradient
      colors={theme.gradient as any}
      locations={[0, 0.4, 0.6, 1]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={style}
      pointerEvents="box-none" 
    >
      {children}
    </LinearGradient>
  );
}

export default Gradient;
