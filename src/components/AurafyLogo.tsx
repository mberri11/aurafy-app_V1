import React, { memo } from 'react';
import { View } from 'react-native';
import Svg, {
  Circle,
  Defs,
  Ellipse,
  G,
  LinearGradient,
  RadialGradient,
  Rect,
  Stop,
} from 'react-native-svg';
import { useTheme } from '../themes/ThemeProvider';

interface AurafyLogoProps {
  /** Logo diameter in px. The aurora halo extends ~2x beyond this. */
  size?: number;
  /** Render the soft radial aurora halo behind the orbit. */
  withHalo?: boolean;
}

const AurafyLogo = memo(function AurafyLogo({
  size = 180,
  withHalo = true,
}: AurafyLogoProps) {
  const theme = useTheme();
  const [g0, g1, g2] = theme.gradient;

  // The HTML reference draws orbit at r=170 inside a 1200x800 canvas with the
  // halo at r=360. Convert to a normalized 400-unit viewBox so callers can
  // resize freely; halo extends to the box edges.
  const VB = 400;
  const cx = VB / 2;
  const cy = VB / 2;
  const orbitR = 170;
  const ellipseRy = 68;
  const coreR = 26;
  const haloR = (VB / 2) * 0.95;
  const stroke = 6; // thicker than the 3px reference because viewBox is wider

  const renderSize = withHalo ? size * 2 : size;

  return (
    <View
      style={{
        width: renderSize,
        height: renderSize,
        alignItems: 'center',
        justifyContent: 'center',
      }}
      pointerEvents="none"
    >
      <Svg width={renderSize} height={renderSize} viewBox={`0 0 ${VB} ${VB}`}>
        <Defs>
          <RadialGradient id="halo" cx="50%" cy="50%" r="50%">
            <Stop offset="0%" stopColor={g0} stopOpacity={withHalo ? 0.55 : 0} />
            <Stop offset="55%" stopColor={g1} stopOpacity={withHalo ? 0.25 : 0} />
            <Stop offset="100%" stopColor={theme.background} stopOpacity={0} />
          </RadialGradient>
          <LinearGradient id="lg" x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0%" stopColor={g0} />
            <Stop offset="55%" stopColor={g1} />
            <Stop offset="100%" stopColor={g2} />
          </LinearGradient>
        </Defs>

        {withHalo ? (
          <>
            <Rect width={VB} height={VB} fill="transparent" />
            <Circle cx={cx} cy={cy} r={haloR} fill="url(#halo)" />
          </>
        ) : null}

        <G transform={`translate(${cx} ${cy})`}>
          {/* Outer orbit ring */}
          <Circle
            r={orbitR}
            stroke="url(#lg)"
            strokeWidth={stroke}
            fill="none"
            opacity={0.55}
          />
          {/* Two crossing ellipses tilted ±30° */}
          <Ellipse
            rx={orbitR}
            ry={ellipseRy}
            stroke="url(#lg)"
            strokeWidth={stroke}
            fill="none"
            transform="rotate(-30)"
          />
          <Ellipse
            rx={orbitR}
            ry={ellipseRy}
            stroke="url(#lg)"
            strokeWidth={stroke}
            fill="none"
            transform="rotate(30)"
          />
          {/* Core node */}
          <Circle r={coreR} fill="url(#lg)" />
        </G>
      </Svg>
    </View>
  );
});

export default AurafyLogo;
