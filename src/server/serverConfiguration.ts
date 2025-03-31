declare global {
   interface Window { env: any; }
}

export default {
   cpqId: parseInt(window.env?.CPQ_UTILITIES || import.meta.env.CPQ_UTILITIES || 535001)
}
