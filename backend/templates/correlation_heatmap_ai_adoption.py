import seaborn as sns
import matplotlib.pyplot as plt
import numpy as np

# Simulated correlation matrix based on extracted data
correlation_matrix = np.array([
    [1.0, 0.687, 0.532, 0.456, 0.612],
    [0.687, 1.0, 0.476, 0.387, 0.578],
    [0.532, 0.476, 1.0, 0.512, 0.456],
    [0.456, 0.387, 0.512, 1.0, 0.387],
    [0.612, 0.578, 0.456, 0.387, 1.0]
])

labels = [
    'Intrinsic Motivation', 
    'Technological Self-Efficacy', 
    'Organizational Learning', 
    'Psychological Safety', 
    'AI Adoption Rate'
]

plt.figure(figsize=(10, 8))
heatmap = sns.heatmap(
    correlation_matrix, 
    annot=True, 
    cmap='coolwarm', 
    xticklabels=labels, 
    yticklabels=labels
)
plt.title('Correlation Heatmap: AI Adoption Factors')
plt.tight_layout()
plt.show()