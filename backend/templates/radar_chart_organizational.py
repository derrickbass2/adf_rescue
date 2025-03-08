import numpy as np
import matplotlib.pyplot as plt

categories = [
    'Technological Infrastructure', 
    'Learning Capacity', 
    'Psychological Safety', 
    'Cultural Alignment', 
    'Intrinsic Motivation'
]

# Simulated data for different organizational contexts
low_adaptation = [0.3, 0.2, 0.4, 0.3, 0.2]
medium_adaptation = [0.6, 0.5, 0.7, 0.6, 0.5]
high_adaptation = [0.9, 0.8, 0.9, 0.8, 0.7]

angles = np.linspace(0, 2*np.pi, len(categories), endpoint=False)
angles = np.concatenate((angles, [angles[0]]))

fig, ax = plt.subplots(figsize=(6, 6), subplot_kw=dict(polar=True))

ax.plot(angles, low_adaptation + [low_adaptation[0]], label='Low Adaptation')
ax.plot(angles, medium_adaptation + [medium_adaptation[0]], label='Medium Adaptation')
ax.plot(angles, high_adaptation + [high_adaptation[0]], label='High Adaptation')

ax.set_thetagrids(angles[:-1] * 180/np.pi, categories)
ax.set_ylim(0, 1)
plt.legend(loc='upper right', bbox_to_anchor=(1.3, 1.0))
plt.title('Organizational AI Adaptation Potential')
plt.show()