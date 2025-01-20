import plotly.graph_objs as go
import numpy as np
import pandas as pd

# Simulated multidimensional data
dimensions = [
    'Technological Infrastructure',
    'Organizational Learning',
    'Psychological Safety',
    'Cognitive Load',
    'Cultural Alignment'
]

low_complexity = [0.3, 0.2, 0.4, 0.5, 0.3]
medium_complexity = [0.6, 0.5, 0.7, 0.6, 0.6]
high_complexity = [0.9, 0.8, 0.9, 0.7, 0.8]

# Create traces for each complexity level
traces = [
    go.Scatterpolar(
        r=low_complexity,
        theta=dimensions,
        fill='toself',
        name='Low Complexity'
    ),
    go.Scatterpolar(
        r=medium_complexity,
        theta=dimensions,
        fill='toself',
        name='Medium Complexity'
    ),
    go.Scatterpolar(
        r=high_complexity,
        theta=dimensions,
        fill='toself',
        name='High Complexity'
    )
]

# Layout configuration
layout = go.Layout(
    polar=dict(
        radialaxis=dict(
            visible=True,
            range=[0, 1]
        )
    ),
    title='Multidimensional AI Adoption Complexity Analysis'
)

# Create figure
fig = go.Figure(data=traces, layout=layout)
fig.show()