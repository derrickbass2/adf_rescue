import seaborn as sns
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

# Simulated dataset
np.random.seed(42)
data = pd.DataFrame({
    'Intrinsic Motivation': np.random.normal(0.5, 0.2, 500),
    'Technological Self-Efficacy': np.random.normal(0.4, 0.15, 500),
    'Organizational Learning': np.random.normal(0.6, 0.25, 500),
    'Psychological Safety': np.random.normal(0.3, 0.1, 500),
    'AI Adoption Rate': np.random.normal(0.5, 0.2, 500)
})

sns.set(style="ticks")
scatter_matrix = sns.pairplot(
    data, 
    diag_kind='kde', 
    plot_kws={'alpha': 0.5}
)
scatter_matrix.fig.suptitle('Scatter Plot Matrix: AI Adoption Variables', y=1.02)
plt.show()