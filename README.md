very simple chat with context

environment variable:
- name: OLLAMA_ORIGIN
  value: "your.ollama.endpoint.local:port"
  require: true

context:
- current: saved at id="context" textarea
- past: child node of each response textarea
