const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border bg-white/50 p-2 backdrop-blur-sm">
        <span className="label">{`${label.replaceAll('-', '/')}`}</span>
        <div>
          {payload.map((pld, index) => (
            <div className="flex gap-1" key={index}>
              <div style={{ color: pld.fill }}>{pld.value}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
};

export default CustomTooltip;
