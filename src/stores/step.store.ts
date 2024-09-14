import { create } from 'zustand'

export interface StepState {
    step: number
    setStep: (step: number) => void
    nextStep: () => void
    resetStep: () => void
}

const useStepState = create<StepState>()(set => ({
    step: 1,
    setStep: step => set({ step }),
    nextStep: () => set(state => ({ step: state.step + 1 })),
    resetStep: () => set({ step: 1 }),
}))

export default useStepState
