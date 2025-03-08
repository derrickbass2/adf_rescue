import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface OnboardingStep {
  id: string;
  name: string;
  completed: boolean;
}

interface OnboardingState {
  steps: OnboardingStep[];
  currentStep: string | null;
}

const initialState: OnboardingState = {
  steps: [
    { id: "step1", name: "Complete Health Check Quiz", completed: false },
    { id: "step2", name: "Link Data Source", completed: false },
    { id: "step3", name: "Review Dashboard Overview", completed: false },
  ],
  currentStep: "step1",
};

const onboardingSlice = createSlice({
  name: "onboarding",
  initialState,
  reducers: {
    markStepComplete(state, action: PayloadAction<string>) {
      const step = state.steps.find((s) => s.id === action.payload);
      if (step) {
        step.completed = true;
        const nextStepIndex = state.steps.findIndex((s) => s.id === action.payload) + 1;
        state.currentStep = nextStepIndex < state.steps.length ? state.steps[nextStepIndex].id : null;
      }
    },
  },
});

export const { markStepComplete } = onboardingSlice.actions;

export default onboardingSlice.reducer;