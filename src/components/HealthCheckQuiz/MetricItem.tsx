interface MetricItemProps {
    readonly calculatedMetricIndex: number;
    readonly score: number;
    readonly onScoreChange: (index: number, value: number) => void;
}

function MetricItem({
    calculatedMetricIndex, score, onScoreChange,
}: MetricItemProps) {
    return (
        <div className="metric-item">
            <input
                type="number"
                min="1"
                max="5"
                value={score || ''}
                onChange={(e) => onScoreChange(calculatedMetricIndex, Number(e.target.value))}
                placeholder="1-5" />
        </div>
    );
}

export default MetricItem;