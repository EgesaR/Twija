const Spinner = ({ size = 60, color = 'text-blue-600', ...props }) => {
    // $stroke-width: 6px from the source
    const strokeWidth = 10;
    const radius = 50; // percentage-based in the original

    return (
        <div className='flex items-center justify-center' {...props}>
      <svg
        className={`overflow-visible ${color}`}
        style={{ width: size, height: size, padding: strokeWidth / 2 }}
        viewBox='0 0 100 100'
      >
        <circle
          cx='50'
          cy='50'
          r='50'
          fill='none'
          stroke='currentColor'
          strokeWidth={strokeWidth}
          strokeLinecap='round'
          style={{ transformOrigin: 'center' }}
        >
          {/* Rotation: -90deg to 810deg (2.5 full rotations) */}
          <animateTransform
            attributeName='transform'
            type='rotate'
            values='-90;810'
            keyTimes='0;1'
            dur='2s'
            repeatCount='indefinite'
          />

          {/* Dash Offset: Controls the 'travel' of the stroke */}
          <animate
            attributeName='stroke-dashoffset'
            values='0%;0%;-157.080%'
            calcMode='spline'
            keySplines='0.61, 1, 0.88, 1; 0.12, 0, 0.39, 0'
            keyTimes='0;0.5;1'
            dur='2s'
            repeatCount='indefinite'
          />

          {/* Dash Array: Controls the stretching of the stroke */}
          <animate
            attributeName='stroke-dasharray'
            values='0% 314.159%;157.080% 157.080%;0% 314.159%'
            calcMode='spline'
            keySplines='0.61, 1, 0.88, 1; 0.12, 0, 0.39, 0'
            keyTimes='0;0.5;1'
            dur='2s'
            repeatCount='indefinite'
          />
        </circle>
      </svg>
    </div>
  );
};

export default Spinner