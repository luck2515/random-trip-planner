export interface PlanResponse {
  plan: {
    candidates: {
      content: {
        parts: {
          text: string;
        }[];
      };
    }[];
  };
}
