import numpy as np
import matplotlib.pyplot as plt
from scipy.stats import norm

# Simulated probability distributions
def create_distribution(mean, std, label, color):
    x = np.linspace(0, 1, 100)
    y = norm.pdf(x, mean, std)
    plt.plot(x, y, label=label, color=color)
    plt.fill_between(x, y, alpha=0.2, color=color)

plt.figure(figsize=(10, 6))

# Different scenarios of AI adoption probability
create_distribution(0.3, 0.1, 'Low Adoption Potential', 'red')
create_distribution(0.5, 0.15, 'Medium Adoption Potential', 'green')
create_distribution(0.7, 0.2, 'High Adoption Potential', 'blue')

plt.title('Probabilistic AI Adoption Potential Distribution')
plt.xlabel('Adoption Probability')
plt.ylabel('Density')
plt.legend()
plt.show()