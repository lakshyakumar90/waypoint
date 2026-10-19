# GenAI Learning Roadmap (Python and/or TypeScript)

Pick one language first. **Python** has the deepest ecosystem (ML, evals, data work). **TypeScript** is best for shipping web apps and agents. Most people learn Python for the AI logic and TypeScript for the product layer, but you can go far with just one.

## 1. Foundations

- **How LLMs work (conceptually):** tokens, embeddings, transformers and attention, context windows, temperature/top-p, pretraining vs fine-tuning vs RLHF
- **Model types:** chat/completion, reasoning models, multimodal (vision, audio), embedding models, image/video generation
- **Core API concepts:** messages and roles, system prompts, streaming, structured outputs (JSON schema), tool/function calling, rate limits, token costs, caching
- **Prompt engineering:** clear instructions, few-shot examples, XML/structured formatting, chain-of-thought, prompt chaining

## 2. Context engineering

This is the discipline of deciding *what goes into the model's context window, and when*. It matters more than clever prompt wording once you build real systems.

- What belongs in context: instructions, tools, retrieved documents, memory, conversation history, examples
- **Context budgeting:** token limits, cost, latency, and "context rot" (quality degrading as context grows)
- **Compaction and summarization** of long histories
- **Just-in-time retrieval:** loading data when needed rather than upfront
- **Selecting and ordering** information (placement affects model attention)
- **Prompt caching** to cut cost and latency
- **Memory systems:** short-term (conversation), long-term (persisted facts), scratchpads and notes files
- **Isolating context** with sub-agents so each one gets a clean, focused window
- **Tool design:** clear names, descriptions, and minimal, non-overlapping tool sets

## 3. RAG and vector databases

**Concepts**
- Embeddings and similarity metrics (cosine, dot product, Euclidean)
- Chunking strategies (fixed, semantic, hierarchical, by document structure)
- Indexing algorithms: HNSW, IVF, product quantization
- **Hybrid search:** vector plus keyword (BM25), then **reranking** with cross-encoders
- Metadata filtering, query rewriting, HyDE, multi-query retrieval
- Advanced patterns: GraphRAG, agentic RAG, parent-child retrieval, contextual retrieval
- **Evaluating retrieval:** recall@k, MRR, nDCG, groundedness, faithfulness

**Technologies**
- **pgvector (Postgres):** best starting point; use what you already know
- **Pinecone, Weaviate, Qdrant, Milvus, Chroma:** dedicated vector DBs
- **FAISS:** local library for similarity search
- **Elasticsearch/OpenSearch:** hybrid search
- Embedding providers: OpenAI, Voyage, Cohere, open-source (sentence-transformers, BGE)

## 4. Loop engineering (agent loops)

"Loop engineering" isn't a formal industry term, so I'm reading it as designing the **agent loop**: the cycle where a model reasons, calls tools, observes results, and repeats until done. Topics under that umbrella:

- **The basic loop:** model call → tool call → tool result → model call → stop
- **Stop conditions:** task complete, max iterations, token/cost budgets, timeouts
- **Error handling inside loops:** retries, backoff, tool failure recovery, self-correction
- **Patterns:** ReAct, plan-and-execute, reflection/critique loops, evaluator-optimizer, orchestrator-workers, routing, parallelization
- **Human-in-the-loop:** approvals, interrupts, checkpoints
- **State management:** persistence, resumability, durable execution
- **Verification loops:** running tests, linting, or checkers so the agent can validate its own work
- **Preventing runaway behavior:** loop detection, guardrails, permission scoping
- **Multi-agent systems:** handoffs, sub-agents, shared vs isolated context (and when *not* to use multiple agents)

## 5. Agents and tool integration

- **Tool use/function calling** in depth, including parallel tool calls
- **MCP (Model Context Protocol):** the standard for connecting models to tools and data; learn to both use and build MCP servers
- **Computer use / browser agents**
- **Code execution sandboxes**
- **Agent skills and reusable instruction packages**
- Security: **prompt injection**, data exfiltration, least-privilege tool access

## 6. Evaluation and observability

This is what separates demos from production.

- Building eval datasets, LLM-as-judge, rubric grading, regression testing
- Tracing and logging every model call, tool call, and cost
- Tools: **LangSmith, Langfuse, Arize Phoenix, Braintrust, Promptfoo, OpenTelemetry**
- Monitoring latency, cost, failure modes, and drift

## 7. Fine-tuning and model customization

- When to fine-tune vs prompt vs RAG (usually try the last two first)
- LoRA/QLoRA, SFT, preference tuning, distillation
- Hugging Face ecosystem: Transformers, PEFT, TRL, Datasets
- Running models locally: Ollama, llama.cpp, vLLM

## 8. Production and deployment

- Streaming UIs, caching, queues and background jobs
- Guardrails, content moderation, PII handling
- Cost optimization: model routing, batching, prompt caching, smaller models
- Reliability: fallbacks across providers, timeouts, idempotency
- Safety and privacy considerations

## SDKs and technologies

**Model provider SDKs (learn at least two)**
- Anthropic SDK (Python/TS), including the Claude Agent SDK
- OpenAI SDK (Python/TS)
- Google Gemini SDK
- Hugging Face `transformers` / Inference API

**Python**
- **Core:** `pydantic` (structured data and validation), `asyncio`, `httpx`, `FastAPI`
- **Frameworks:** LangChain and **LangGraph** (stateful agent workflows), LlamaIndex (RAG-focused), DSPy (programmatic prompt optimization), CrewAI/AutoGen (multi-agent), Instructor (structured outputs)
- **Data/ML:** NumPy, pandas, PyTorch (for deeper understanding)

**TypeScript**
- **Vercel AI SDK:** the most popular for streaming chat UIs and tool calling
- **LangChain.js / LangGraph.js**, **Mastra** (TS agent framework)
- **Zod** (schemas and validation), Node.js, Next.js/React for frontends
- Hono or Express for backends

**Infrastructure**
- Docker, Postgres, Redis, a cloud platform (AWS/GCP/Azure), Git
- Workflow engines for durable agents: Temporal, Inngest

## Suggested learning order

1. API basics: call a model, stream, use structured output, add a tool
2. Prompting plus context engineering fundamentals
3. Build a RAG app with pgvector and a reranker
4. Build an agent loop **from scratch** (no framework) so you understand it
5. Then adopt a framework (LangGraph or Vercel AI SDK) and an MCP server
6. Add evals and tracing to everything you build
7. Go deeper: multi-agent, fine-tuning, production hardening

## Project ideas to practice

- Chat with your own documents (RAG)
- A coding or research agent with a verification loop
- A custom MCP server wrapping an API you use
- An eval harness comparing models or prompts on your own tasks

Since SDKs and frameworks change fast, check each one's official docs for current versions and APIs as you go. I can also turn any section into a week-by-week study plan or go deeper on one area, like context engineering or building an agent loop in Python or TypeScript.