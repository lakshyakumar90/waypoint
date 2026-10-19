# System Design and Language Topics

Below is every topic and subtopic I'd cover for each area. Within each language, topics are ordered from basics to advanced.

---

# PART 1: System Design and Scaling

## 1. Fundamentals

- **Requirements:** functional vs non-functional, SLA/SLO/SLI, availability, reliability, latency vs throughput
- **Back-of-envelope estimation:** QPS, storage, bandwidth, memory, latency numbers every engineer should know, powers of two
- **Core tradeoffs:** consistency vs availability, latency vs throughput, cost vs performance, simplicity vs flexibility
- **Architecture styles:** monolith, modular monolith, microservices, SOA, serverless, event-driven, hexagonal/clean architecture

## 2. Networking

- OSI/TCP-IP model, TCP vs UDP, handshakes, congestion control
- DNS (resolution, records, GeoDNS), HTTP/1.1, HTTP/2, HTTP/3 (QUIC), TLS/SSL
- REST, GraphQL, gRPC, WebSockets, Server-Sent Events, long polling, webhooks
- API design: versioning, pagination, idempotency, rate limiting, error handling, OpenAPI
- CDNs (push vs pull, edge caching, invalidation), proxies, forward vs reverse proxy
- Load balancers: L4 vs L7, algorithms (round robin, least connections, consistent hashing), health checks, sticky sessions, global load balancing
- API gateways, service mesh (Istio, Envoy), sidecars

## 3. Data Storage

- **Relational:** ACID, normalization/denormalization, indexes (B-tree, hash, covering, composite), query planning, transactions, isolation levels, MVCC, locking, deadlocks, joins
- **NoSQL types:** key-value, document, wide-column, graph, time-series, search engines, vector databases
- **Storage engines:** B-tree vs LSM tree, write-ahead log, SSTables, compaction
- **Object/blob storage, file systems, block storage**
- **Data modeling:** schema design, schema evolution, migrations, soft deletes
- OLTP vs OLAP, data warehouses, data lakes, columnar formats (Parquet)

## 4. Scaling Concepts

- **Vertical vs horizontal scaling**, stateless services, autoscaling
- **Replication:** leader-follower, multi-leader, leaderless, sync vs async, replication lag, read replicas
- **Partitioning/sharding:** range, hash, directory-based, consistent hashing, hot spots, resharding, cross-shard queries
- **Caching:** cache-aside, read-through, write-through, write-back, write-around, eviction (LRU, LFU, TTL), cache stampede, invalidation, distributed caches (Redis, Memcached), multi-level caches
- **Connection pooling**, backpressure, load shedding, request coalescing
- **Database scaling:** CQRS, denormalization, materialized views, read/write splitting
- **Multi-region:** active-active, active-passive, geo-replication, data residency

## 5. Distributed Systems Theory

- CAP theorem, PACELC, BASE
- **Consistency models:** strong, linearizability, sequential, causal, eventual, read-your-writes
- **Consensus:** Paxos, Raft, Zab, leader election, quorums
- **Time and ordering:** logical clocks, vector clocks, Lamport timestamps, hybrid logical clocks, clock skew
- **Failures:** failure detection, gossip protocols, split brain, Byzantine faults, network partitions
- **Distributed transactions:** two-phase commit, three-phase commit, sagas, outbox pattern, TCC
- **Idempotency**, exactly-once vs at-least-once vs at-most-once delivery
- **Data structures:** Bloom filters, HyperLogLog, count-min sketch, skip lists, Merkle trees, CRDTs, geohash, quadtrees

## 6. Messaging and Async Processing

- Message queues vs pub/sub vs event streaming
- Kafka (topics, partitions, consumer groups, offsets, log compaction), RabbitMQ, SQS, Pulsar, NATS
- Event sourcing, change data capture (CDC), dead-letter queues, retries, ordering guarantees
- Batch vs stream processing (Spark, Flink), lambda and kappa architectures
- Task queues, workers, schedulers, cron, workflow engines (Temporal)

## 7. Reliability and Resilience

- Redundancy, failover, disaster recovery (RTO/RPO), backups
- Circuit breakers, retries with exponential backoff and jitter, timeouts, bulkheads, rate limiting algorithms (token bucket, leaky bucket, sliding window)
- Graceful degradation, feature flags, canary releases, blue-green deployments, rollbacks
- Chaos engineering, game days, capacity planning

## 8. Observability and Operations

- Logging, metrics, distributed tracing (OpenTelemetry), alerting, dashboards
- Golden signals (latency, traffic, errors, saturation), SRE practices, error budgets, incident response, postmortems
- Containers (Docker), Kubernetes, CI/CD, infrastructure as code (Terraform), configuration management

## 9. Security

- Authentication vs authorization, OAuth2, OIDC, JWT, sessions, SSO, RBAC/ABAC, API keys
- Encryption at rest and in transit, key management, secrets management
- OWASP Top 10, DDoS protection, WAF, zero trust, multi-tenancy isolation

## 10. Classic Design Problems to Practice

URL shortener, rate limiter, news feed, chat/messaging system, notification service, search autocomplete, web crawler, distributed cache, key-value store, unique ID generator (Snowflake), video streaming, file storage (Dropbox), ride-sharing, payment system, ticket booking, collaborative editor, metrics/monitoring system, API gateway.

## 11. Design Patterns and Principles

- SOLID, DRY, KISS, YAGNI, separation of concerns, Law of Demeter
- GoF patterns: creational (factory, builder, singleton), structural (adapter, decorator, facade, proxy), behavioral (observer, strategy, command, state)
- Domain-driven design: bounded contexts, aggregates, entities, value objects
- Enterprise patterns: repository, unit of work, saga, strangler fig, BFF, sidecar

---

# PART 2: Programming Languages

## Python

- **Basics:** types, variables, operators, control flow, functions, scope (LEGB), comprehensions, f-strings
- **Data structures:** list, tuple, dict, set, frozenset, deque, heapq, collections (Counter, defaultdict, OrderedDict, namedtuple), bisect
- **Functions:** args/kwargs, closures, decorators, lambda, higher-order functions, `functools` (partial, lru_cache, reduce), generators, iterators, `itertools`
- **OOP:** classes, inheritance, MRO, dunder methods, properties, `@classmethod`, `@staticmethod`, dataclasses, ABCs, protocols, descriptors, metaclasses, `__slots__`
- **Type system:** type hints, generics, `TypeVar`, `Protocol`, `Literal`, `TypedDict`, mypy/pyright, pydantic
- **Modules and packaging:** imports, packages, virtual environments, pip, uv, poetry, `pyproject.toml`, publishing
- **Error handling:** exceptions, custom exceptions, context managers, `with`, `contextlib`
- **Files and I/O:** `pathlib`, JSON, CSV, serialization (pickle, protobuf), regex
- **Concurrency:** threading, multiprocessing, the GIL, `asyncio` (event loop, tasks, gather), `concurrent.futures`, free-threaded Python, async generators
- **Internals:** CPython, reference counting, garbage collection, memory model, bytecode, interning, mutability and identity
- **Performance:** profiling (cProfile), Cython, Numba, C extensions, PyPy, vectorization
- **Testing:** pytest, fixtures, mocking, parametrization, hypothesis, coverage
- **Tooling:** ruff, black, pre-commit, logging, debugging
- **Ecosystem:** NumPy, pandas, Polars, FastAPI, Django, Flask, SQLAlchemy, Celery, PyTorch, scikit-learn, requests/httpx

## Java

- **Basics:** primitives, strings, arrays, control flow, methods, packages, access modifiers
- **OOP:** classes, inheritance, polymorphism, interfaces, abstract classes, enums, records, sealed classes, inner and anonymous classes
- **Generics:** bounded types, wildcards, type erasure
- **Collections:** List, Set, Map, Queue, Deque, `ArrayList` vs `LinkedList`, `HashMap` internals, `TreeMap`, concurrent collections, Comparable/Comparator
- **Functional Java:** lambdas, functional interfaces, method references, Streams API, Optional
- **Exceptions:** checked vs unchecked, try-with-resources
- **I/O:** `java.io`, NIO/NIO.2, serialization
- **Concurrency:** threads, `Runnable`/`Callable`, `ExecutorService`, `synchronized`, `volatile`, locks, atomics, `CompletableFuture`, fork/join, virtual threads (Project Loom), structured concurrency, Java Memory Model
- **JVM internals:** class loading, bytecode, JIT compilation, heap and stack, garbage collectors (G1, ZGC, Shenandoah), memory tuning, profiling, JFR
- **Modern Java:** modules (JPMS), pattern matching, text blocks, switch expressions, records
- **Build tools:** Maven, Gradle
- **Frameworks:** Spring and Spring Boot (DI, MVC, Data JPA, Security, WebFlux), Hibernate/JPA, Quarkus, Micronaut
- **Testing:** JUnit 5, Mockito, Testcontainers
- **Other:** annotations, reflection, JDBC, logging (SLF4J)

## Kotlin

- **Basics:** `val` vs `var`, type inference, null safety (`?`, `?.`, `?:`, `!!`), string templates, expressions
- **Functions:** default and named arguments, extension functions, higher-order functions, lambdas, inline functions, infix and operator overloading
- **OOP:** classes, data classes, sealed classes/interfaces, objects, companion objects, object expressions, enums, delegation (`by`), properties
- **Generics:** variance (`in`/`out`), reified types, type constraints
- **Collections and sequences:** map/filter/fold, lazy sequences
- **Scope functions:** `let`, `run`, `with`, `apply`, `also`
- **Coroutines:** suspend functions, builders (`launch`, `async`), dispatchers, structured concurrency, Flow, StateFlow, SharedFlow, channels, exception handling
- **DSLs and metaprogramming:** type-safe builders, annotations, KSP, reflection
- **Multiplatform:** Kotlin Multiplatform (KMP), Compose Multiplatform, expect/actual
- **Android:** Jetpack Compose, ViewModel, Room, Hilt, WorkManager, Navigation, lifecycle
- **Backend:** Ktor, Spring with Kotlin, Exposed
- **Interop:** calling Java from Kotlin and the reverse, JVM annotations
- **Testing and tooling:** JUnit, MockK, Gradle Kotlin DSL

## Swift

- **Basics:** `let` vs `var`, types, optionals, optional chaining, `guard`, `if let`, control flow, tuples
- **Functions and closures:** argument labels, closures, trailing closures, capturing, escaping
- **Types:** structs vs classes (value vs reference semantics), enums with associated values, copy-on-write
- **Protocols:** protocol-oriented programming, extensions, protocol extensions, associated types, existentials vs opaque types (`some`, `any`)
- **Generics:** constraints, generic where clauses, parameter packs
- **Memory:** ARC, strong/weak/unowned references, retain cycles, ownership, noncopyable types
- **Error handling:** `throws`, `try`, `Result`, typed throws
- **Concurrency:** async/await, `Task`, actors, `Sendable`, structured concurrency, `AsyncSequence`, Swift 6 strict concurrency, GCD/Dispatch
- **Language features:** property wrappers, result builders, macros, key paths, codable
- **SwiftUI:** views, state and data flow (`@State`, `@Binding`, `@Observable`, `@Environment`), navigation, layout, animations, lists, custom modifiers
- **UIKit basics:** view controllers, auto layout, lifecycle
- **Apple frameworks:** SwiftData, Core Data, Combine, Core Animation, MapKit, HealthKit, StoreKit, Swift Charts
- **Tooling:** Xcode, Swift Package Manager, XCTest, Swift Testing, Instruments, TestFlight, App Store submission
- **Server-side:** Vapor, Hummingbird
- **Interop:** Objective-C, C/C++

## Rust

- **Basics:** cargo, variables and mutability, types, control flow, functions, expressions vs statements, shadowing
- **Ownership (the core):** ownership rules, move semantics, borrowing, references, mutable vs immutable borrows, slices, the borrow checker
- **Lifetimes:** annotations, elision rules, lifetimes in structs, `'static`, variance
- **Data types:** structs, enums, `Option`, `Result`, pattern matching, `match`, `if let`, `let else`
- **Traits and generics:** trait definition and bounds, `impl Trait`, trait objects (`dyn`), associated types, blanket implementations, orphan rule, operator overloading, const generics
- **Collections:** `Vec`, `String`/`&str`, `HashMap`, `HashSet`, `BTreeMap`, `VecDeque`, iterators and adapters
- **Smart pointers:** `Box`, `Rc`, `Arc`, `RefCell`, `Cell`, `Mutex`, `RwLock`, `Cow`, `Pin`
- **Error handling:** `?` operator, custom errors, `thiserror`, `anyhow`
- **Closures and functional style:** `Fn`/`FnMut`/`FnOnce`, iterator chains
- **Concurrency:** threads, channels (`mpsc`), shared state, `Send` and `Sync`, atomics and memory ordering, data parallelism (Rayon)
- **Async:** `Future`, `async`/`await`, Tokio, `async-std`, pinning, streams, async traits
- **Modules and crates:** visibility, workspaces, features, publishing to crates.io
- **Macros:** declarative (`macro_rules!`), procedural (derive, attribute, function-like)
- **Unsafe Rust:** raw pointers, FFI, `unsafe` traits, `MaybeUninit`, soundness
- **Systems topics:** memory layout, zero-cost abstractions, `no_std`, embedded, WebAssembly
- **Testing and tooling:** unit/integration tests, doc tests, criterion benchmarks, clippy, rustfmt, miri
- **Ecosystem:** serde, tokio, axum/actix-web, sqlx, clap, tracing, reqwest

## C++

- **Basics:** compilation model (preprocessor, compiler, linker), types, pointers, references, arrays, functions, namespaces, headers vs sources
- **Memory:** stack vs heap, `new`/`delete`, memory layout, alignment, undefined behavior, memory leaks, dangling pointers
- **OOP:** classes, constructors and destructors, inheritance, virtual functions, vtables, abstract classes, multiple inheritance, object slicing
- **RAII and resource management:** Rule of 0/3/5, copy and move semantics, rvalue references, `std::move`, perfect forwarding, copy elision
- **Smart pointers:** `unique_ptr`, `shared_ptr`, `weak_ptr`, custom deleters
- **Templates:** function and class templates, specialization, variadic templates, SFINAE, `if constexpr`, CRTP, type traits, metaprogramming
- **Modern C++ (11/14/17/20/23):** `auto`, lambdas, `constexpr`/`consteval`, structured bindings, `std::optional`, `std::variant`, `std::string_view`, `std::span`, concepts, ranges, modules, coroutines, `std::format`, `std::expected`
- **STL:** containers (`vector`, `map`, `unordered_map`, `deque`, `set`, etc.), iterators, algorithms, functors, allocators, complexity guarantees
- **Concurrency:** `std::thread`, mutexes, locks, condition variables, atomics, memory model and ordering, futures/promises, `std::jthread`, lock-free programming
- **Error handling:** exceptions, exception safety guarantees, `noexcept`, error codes
- **Build and tooling:** CMake, Make, Ninja, Conan/vcpkg, compilers (GCC, Clang, MSVC), sanitizers (ASan, UBSan, TSan), Valgrind, gdb/lldb
- **Performance:** cache locality, branch prediction, inlining, SIMD, profiling, data-oriented design
- **Low level:** pointers arithmetic, bit manipulation, inline assembly, ABI, linking (static/dynamic), `extern "C"`
- **Testing:** GoogleTest, Catch2
- **Best practices:** C++ Core Guidelines, static analysis (clang-tidy)

## Dart

- **Basics:** variables (`var`, `final`, `const`, `late`), types, operators, control flow, functions, string interpolation
- **Null safety:** nullable types, `?`, `??`, `!`, `late`, flow analysis
- **OOP:** classes, constructors (named, factory, const), inheritance, mixins, abstract classes, interfaces, extension methods, enums with members, records, sealed classes
- **Generics and collections:** List, Set, Map, spread operators, collection `if`/`for`
- **Functional features:** first-class functions, closures, typedefs, pattern matching
- **Async:** `Future`, `async`/`await`, `Stream`, generators (`sync*`, `async*`), `StreamController`
- **Isolates:** concurrency model, message passing, `compute`, `Isolate.run`
- **Libraries and packages:** pub, `pubspec.yaml`, imports, `part`/`part of`, code generation (`build_runner`)
- **Error handling:** exceptions, `try`/`catch`/`finally`
- **Tooling:** Dart DevTools, analyzer, formatter, `dart test`, FFI

## Flutter

- **Fundamentals:** widget tree, `StatelessWidget` vs `StatefulWidget`, `BuildContext`, hot reload and hot restart, project structure
- **Layout:** Row, Column, Stack, Expanded/Flexible, Container, Padding, constraints ("constraints go down, sizes go up"), slivers, `ListView`, `GridView`, responsive and adaptive layouts, `LayoutBuilder`, `MediaQuery`
- **Widgets:** Material 3, Cupertino, text, images, forms and validation, buttons, dialogs, navigation bars, tabs, scrolling widgets
- **Theming and styling:** `ThemeData`, dark mode, custom fonts, design tokens
- **Navigation:** Navigator 1.0/2.0, `go_router`, deep linking, route transitions
- **State management:** `setState`, `InheritedWidget`, Provider, Riverpod, Bloc/Cubit, GetX, MobX, Redux, signals
- **Architecture:** MVVM, clean architecture, repository pattern, dependency injection (`get_it`)
- **Animations:** implicit, explicit (`AnimationController`), Hero, Lottie/Rive, custom painters, physics-based animation
- **Networking and data:** `http`, Dio, JSON serialization (`json_serializable`, freezed), REST, GraphQL, WebSockets
- **Persistence:** SharedPreferences, SQLite (sqflite, Drift), Hive, Isar, secure storage
- **Backend integration:** Firebase (Auth, Firestore, Cloud Messaging, Crashlytics), Supabase, push notifications
- **Platform integration:** platform channels, method channels, FFI, plugins, native views, permissions, camera, location, sensors
- **Rendering internals:** widget, element, and render object trees, Impeller/Skia, build vs layout vs paint, keys
- **Performance:** DevTools profiler, rebuild optimization, `const` widgets, lazy lists, image caching, jank diagnosis
- **Testing:** unit, widget, integration, golden tests, mocking (`mocktail`)
- **Platforms:** Android, iOS, web, desktop (Windows, macOS, Linux), embedded
- **Release:** flavors, signing, CI/CD (Fastlane, Codemagic), app store and Play Store publishing, internationalization and localization, accessibility

---

## Suggested Order

1. **Python** first for fast prototyping, then **Java or Kotlin** for strong typing and OOP.
2. **System design** in parallel once you have built a couple of backend projects, since the concepts only stick when you have felt the pain they solve.
3. **C++ and Rust** after you understand memory, pointers, and concurrency; learning them together highlights what Rust's ownership model fixes.
4. **Mobile (Dart/Flutter, Kotlin, Swift)** pick one path based on your goal: Flutter for cross-platform, Kotlin for Android, Swift for Apple.

For system design, the best resource is a mix of *Designing Data-Intensive Applications* by Martin Kleppmann, the Google SRE book, and practicing the design problems listed above on paper.