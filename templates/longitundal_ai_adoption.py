import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
import seaborn as sns

# Simulated longitudinal data
time_points = ['0-6 months', '6-18 months', '18-36 months']
adoption_rates = [47.6, 62.4, 78.3]
motivation_correlations = [0.387, 0.512, 0.687]
confidence_intervals = [0.1, 0.15, 0.2]

fig, ax1 = plt.subplots(figsize=(10, 6))

# Adoption Rates
color = 'tab:blue'
ax1.set_xlabel('Adaptation Timeline')
ax1.set_ylabel('AI Adoption Rate (%)', color=color)
ax1.plot(time_points, adoption_rates, color=color, marker='o')
ax1.fill_between(time_points, 
                 [rate - ci for rate, ci in zip(adoption_rates, confidence_intervals)],
                 [rate + ci for rate, ci in zip(adoption_rates, confidence_intervals)],
                 color=color, alpha=0.2)
ax1.tick_params(axis='y', labelcolor=color)

# Motivation Correlation
ax2 = ax1.twinx()
color = 'tab:red'
ax2.set_ylabel('Intrinsic Motivation Correlation', color=color)
ax2.plot(time_points, motivation_correlations, color=color, marker='s')
ax2.tick_params(axis='y', labelcolor=color)

plt.title('Longitudinal AI Adoption and Motivation Trajectory')
plt.tight_layout()
plt.show()