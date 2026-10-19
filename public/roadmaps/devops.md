# DevOps, Cloud, and Container Topics

Ordered so each part builds on the previous one. Learn Linux, Git, and Docker before Kubernetes or the clouds.

---

# PART 1: DevOps

## 1. Foundations

- **Culture and concepts:** DevOps vs SRE vs platform engineering, CALMS, DORA metrics (deployment frequency, lead time, change failure rate, MTTR), shift-left, you build it you run it
- **SDLC models:** Agile, Scrum, Kanban, trunk-based development, GitOps, DevSecOps

## 2. Linux and Shell

- **File system:** hierarchy, permissions, ownership, ACLs, links, inodes, mounts, disk usage (`df`, `du`, `lsblk`)
- **Processes:** `ps`, `top`/`htop`, signals, `systemd`, services, cron, namespaces and cgroups (the basis of containers)
- **Users and security:** sudo, SSH keys, `ssh-agent`, SELinux/AppArmor, firewalls (`iptables`, `nftables`, `ufw`)
- **Text tools:** `grep`, `sed`, `awk`, `find`, `xargs`, `jq`, `curl`, pipes and redirection
- **Shell scripting:** Bash, variables, conditionals, loops, functions, exit codes, `set -euo pipefail`, traps
- **Troubleshooting:** `strace`, `lsof`, `netstat`/`ss`, `tcpdump`, `dmesg`, `journalctl`, `vmstat`, `iostat`, performance analysis

## 3. Networking Essentials

- IP addressing, CIDR, subnets, NAT, routing, DNS, DHCP, ports
- TCP/UDP, HTTP/HTTPS, TLS, certificates, load balancing, reverse proxies (Nginx, HAProxy, Envoy, Traefik)
- VPNs, bastion hosts, firewalls, security groups, VLANs

## 4. Version Control and Git

- Commits, branches, merge vs rebase, cherry-pick, stash, reflog, bisect, hooks
- Branching strategies: Git Flow, GitHub Flow, trunk-based
- Pull requests, code review, monorepo vs polyrepo, semantic versioning, conventional commits
- Platforms: GitHub, GitLab, Bitbucket

## 5. CI/CD

- **Concepts:** continuous integration, delivery vs deployment, pipelines as code, artifacts, caching, parallelism, environments, approvals
- **Tools:** GitHub Actions, GitLab CI, Jenkins, CircleCI, Azure DevOps, Tekton, Argo Workflows, Buildkite
- **Pipeline stages:** build, unit test, lint, SAST/DAST, dependency scan, container build, integration test, deploy, smoke test
- **Deployment strategies:** rolling, blue-green, canary, shadow, feature flags, progressive delivery (Argo Rollouts, Flagger)
- **GitOps:** ArgoCD, Flux, declarative desired state, drift detection
- **Artifact management:** Nexus, Artifactory, container registries, package registries

## 6. Infrastructure as Code and Configuration Management

- **Terraform/OpenTofu:** providers, resources, variables, outputs, state (remote state, locking), modules, workspaces, `plan`/`apply`, drift, import, Terragrunt
- **Pulumi** (real programming languages), **AWS CDK**, **CloudFormation**, **Bicep**, **Crossplane**
- **Configuration management:** Ansible (inventory, playbooks, roles, idempotency, Vault), Chef, Puppet
- **Image building:** Packer, immutable infrastructure, golden images
- **Policy as code:** OPA/Rego, Sentinel, Kyverno, Checkov, tfsec

## 7. Monitoring, Logging, and Observability

- **Metrics:** Prometheus (PromQL, exporters, Alertmanager), Grafana, Thanos/Mimir, StatsD
- **Logs:** ELK/EFK (Elasticsearch, Logstash/Fluentd, Kibana), Loki, Fluent Bit, structured logging
- **Tracing:** OpenTelemetry, Jaeger, Tempo, Zipkin
- **Commercial:** Datadog, New Relic, Dynatrace, Splunk
- **Concepts:** SLI/SLO/SLA, error budgets, golden signals, RED and USE methods, alert fatigue, on-call, runbooks, incident management (PagerDuty, Opsgenie), postmortems

## 8. DevSecOps

- Secrets management (Vault, cloud secret managers, SOPS, sealed secrets)
- Image and dependency scanning (Trivy, Grype, Snyk, Dependabot), SBOMs, image signing (Cosign, Sigstore), supply-chain security (SLSA)
- SAST/DAST (SonarQube, Semgrep, OWASP ZAP), compliance as code, least privilege, CIS benchmarks

## 9. Reliability and Operations

- High availability, disaster recovery (RTO/RPO), backups, capacity planning, autoscaling
- Chaos engineering (Chaos Mesh, Litmus, Gremlin), load testing (k6, Locust, JMeter)
- Cost management and FinOps, change management, release management

---

# PART 2: Docker

## 1. Core Concepts

- Containers vs VMs, images vs containers, layers, union file systems (OverlayFS)
- Docker architecture: client, daemon (`dockerd`), `containerd`, `runc`, OCI standards
- Namespaces (pid, net, mnt, uts, ipc, user), cgroups, capabilities

## 2. Working with Containers

- Lifecycle: `run`, `start`, `stop`, `kill`, `rm`, `exec`, `attach`, `logs`, `inspect`, `stats`, `cp`
- Flags: `-d`, `-it`, `-p`, `-v`, `-e`, `--rm`, `--name`, `--restart`, `--network`
- Resource limits (CPU, memory), health checks, restart policies, `init` processes and signal handling

## 3. Dockerfile and Image Building

- Instructions: `FROM`, `RUN`, `COPY` vs `ADD`, `WORKDIR`, `ENV`, `ARG`, `EXPOSE`, `CMD` vs `ENTRYPOINT`, `USER`, `HEALTHCHECK`, `LABEL`, `VOLUME`
- Layer caching and instruction ordering, `.dockerignore`
- **Multi-stage builds**, minimal base images (Alpine, distroless, scratch, slim)
- **BuildKit,** `buildx`, multi-architecture builds (amd64/arm64), build secrets, cache mounts
- Best practices: non-root users, pinning versions and digests, reducing size, reproducible builds
- Alternatives: Podman, Buildah, Kaniko, Jib, Buildpacks, nerdctl

## 4. Storage

- Volumes vs bind mounts vs tmpfs, volume drivers, data persistence, backup and restore
- Storage drivers, image layers and copy-on-write

## 5. Networking

- Bridge, host, none, overlay, macvlan; user-defined networks, DNS-based service discovery
- Port mapping, container-to-container communication, network inspection

## 6. Docker Compose

- `compose.yaml` structure: services, networks, volumes, environment, `depends_on`, healthchecks, profiles
- Override files, env files, scaling services, development workflows (watch, bind mounts)
- Compose vs Kubernetes: when each fits

## 7. Docker Security

- Rootless mode, user namespaces, dropping capabilities, read-only file systems, seccomp, AppArmor
- Image scanning (Docker Scout, Trivy), content trust, secrets handling, avoiding privileged containers, never mounting the Docker socket carelessly
- CIS Docker Benchmark

## 8. Debugging and Operations

- Inspecting logs, `docker events`, `docker system df`, pruning, `docker debug`, container resource usage
- Logging drivers, monitoring containers (cAdvisor)
- Docker Desktop, Docker contexts, Docker Swarm basics (historical context, mostly replaced by Kubernetes)

---

# PART 3: Docker Hub and Container Registries

- **Docker Hub:** accounts, organizations, teams, public vs private repositories, tags and digests, official images, verified publisher and Docker-Sponsored Open Source images
- **Workflow:** `docker login`, `tag`, `push`, `pull`, naming conventions (`registry/namespace/repo:tag`), tagging strategies (semantic versions, git SHA, avoid relying on `latest`)
- **Automation:** access tokens, automated builds, webhooks, CI integration, Docker Build Cloud
- **Limits and governance:** pull rate limits, mirrors and pull-through caches, vulnerability scanning, image retention
- **Alternatives and private registries:** Amazon ECR, Google Artifact Registry, Azure ACR, GitHub Container Registry (GHCR), GitLab Registry, Harbor, Quay, self-hosted `registry:2`
- **Supply chain:** image signing, provenance attestations, SBOMs, immutable tags

---

# PART 4: Kubernetes

## 1. Architecture

- **Control plane:** `kube-apiserver`, `etcd`, `kube-scheduler`, `kube-controller-manager`, cloud-controller-manager
- **Node components:** `kubelet`, `kube-proxy`, container runtime (containerd, CRI-O), CRI/CNI/CSI interfaces
- Declarative model, reconciliation loops, desired vs actual state, API groups and versions, `kubectl` internals

## 2. Core Workload Objects

- **Pods:** lifecycle, multi-container pods, init containers, sidecars, ephemeral containers, probes (liveness, readiness, startup), resource requests and limits, QoS classes
- **Controllers:** ReplicaSet, Deployment (rolling updates, rollbacks), StatefulSet, DaemonSet, Job, CronJob
- **Labels, selectors, annotations, namespaces**, ownership and garbage collection
- Lifecycle hooks, graceful termination, PodDisruptionBudgets

## 3. Configuration

- ConfigMaps, Secrets (and their limits), environment variables, mounted config, projected volumes, Downward API
- Immutable config, external secrets (External Secrets Operator, Secrets Store CSI driver)

## 4. Networking

- Pod networking model, CNI plugins (Calico, Cilium, Flannel, Weave)
- **Services:** ClusterIP, NodePort, LoadBalancer, ExternalName, headless services, EndpointSlices
- **Ingress** and ingress controllers (NGINX, Traefik), **Gateway API**
- DNS (CoreDNS), network policies, service mesh (Istio, Linkerd), mTLS, eBPF-based networking

## 5. Storage

- Volumes, PersistentVolumes, PersistentVolumeClaims, StorageClasses, dynamic provisioning
- CSI drivers, access modes, reclaim policies, volume snapshots, StatefulSet storage
- Running databases on Kubernetes (and operators for them)

## 6. Scheduling and Resource Management

- Scheduler flow, node selectors, affinity and anti-affinity, taints and tolerations, topology spread constraints, priority and preemption
- Resource quotas, LimitRanges, requests vs limits, CPU throttling, OOM kills
- **Autoscaling:** HPA, VPA, Cluster Autoscaler, Karpenter, KEDA (event-driven)

## 7. Security

- **RBAC:** Roles, ClusterRoles, bindings, ServiceAccounts
- Pod Security Standards and admission, SecurityContext, network policies, secrets encryption at rest
- Admission controllers, OPA Gatekeeper, Kyverno, image policy, runtime security (Falco), supply chain security
- Audit logging, CIS Kubernetes Benchmark, multi-tenancy, workload identity

## 8. Packaging and Deployment

- **Helm:** charts, values, templates, hooks, releases, repositories, OCI charts
- **Kustomize:** bases, overlays, patches
- GitOps with ArgoCD and Flux, progressive delivery, Skaffold, Tilt, Telepresence for development

## 9. Extending Kubernetes

- Custom Resource Definitions (CRDs), controllers and **operators**, Operator SDK, Kubebuilder, client-go
- Admission webhooks, API aggregation, custom schedulers, Cluster API

## 10. Observability and Troubleshooting

- `kubectl` debugging: `describe`, `logs`, `exec`, `events`, `top`, `debug`, `port-forward`
- Common failures: CrashLoopBackOff, ImagePullBackOff, Pending pods, OOMKilled, evictions, node NotReady, DNS issues
- Metrics Server, kube-state-metrics, Prometheus Operator, logging, tracing, cluster upgrades and etcd backup/restore

## 11. Cluster Operations

- Installation: `kubeadm`, kind, minikube, k3s, Talos
- **Managed services:** EKS, GKE (Standard and Autopilot), AKS
- Upgrades, node pools, multi-cluster and multi-region, federation, cost management (Kubecost), cluster lifecycle, disaster recovery (Velero)
- Alternatives and adjacent: Nomad, OpenShift, Rancher, Docker Swarm

---

# PART 5: AWS

## 1. Foundations

- Regions, Availability Zones, edge locations, global infrastructure
- **IAM:** users, groups, roles, policies (identity, resource, SCP, permission boundaries), STS, MFA, least privilege, policy evaluation logic, IAM Identity Center
- Shared responsibility model, AWS CLI, SDKs, Console, CloudShell
- Billing, Organizations, multi-account strategy, Control Tower, tagging, Cost Explorer, Budgets, Savings Plans, Reserved and Spot instances

## 2. Compute

- **EC2:** instance families and types, AMIs, EBS, instance store, key pairs, user data, placement groups, purchasing options, Auto Scaling Groups, launch templates
- **Containers:** ECS (tasks, services, Fargate vs EC2), EKS, ECR, App Runner
- **Serverless:** Lambda (triggers, layers, concurrency, cold starts, event source mappings), Step Functions, EventBridge
- Elastic Beanstalk, Lightsail, Batch, Outposts

## 3. Networking

- **VPC:** CIDR, subnets (public/private), route tables, Internet Gateway, NAT Gateway, security groups vs NACLs, VPC endpoints (gateway and interface), PrivateLink, peering, Transit Gateway, flow logs
- **Route 53:** record types, routing policies (weighted, latency, failover, geolocation), health checks
- **Load balancers:** ALB, NLB, GWLB, CLB
- **CloudFront**, Global Accelerator, API Gateway (REST, HTTP, WebSocket), VPN, Direct Connect

## 4. Storage

- **S3:** buckets, storage classes, lifecycle rules, versioning, replication, encryption, presigned URLs, bucket policies, event notifications, Object Lock, Transfer Acceleration
- **EBS** (volume types, snapshots), **EFS**, **FSx**, Storage Gateway, Glacier, Snow family, AWS Backup

## 5. Databases

- **Relational:** RDS (Multi-AZ, read replicas, parameter groups), Aurora (Serverless v2, Global Database)
- **NoSQL:** DynamoDB (partition keys, GSI/LSI, capacity modes, streams, DAX, single-table design), DocumentDB, Keyspaces, Neptune, Timestream
- ElastiCache (Redis/Valkey, Memcached), MemoryDB, Redshift, OpenSearch, Database Migration Service

## 6. Messaging, Integration, and Analytics

- SQS (standard vs FIFO, DLQ, visibility timeout), SNS, EventBridge, Kinesis (Streams, Firehose), MSK (Kafka), Amazon MQ
- Athena, Glue, EMR, Lake Formation, QuickSight, Step Functions

## 7. Security and Compliance

- KMS, Secrets Manager, Parameter Store, ACM, WAF, Shield, GuardDuty, Inspector, Macie, Security Hub, Config, CloudTrail, Cognito, Detective
- Encryption at rest and in transit, compliance programs, audit and governance

## 8. Management, Monitoring, and DevOps Services

- CloudWatch (metrics, logs, alarms, dashboards, Logs Insights), X-Ray, Systems Manager, CloudFormation, CDK, Service Catalog, Trusted Advisor
- CodeCommit (legacy), CodeBuild, CodeDeploy, CodePipeline

## 9. AI/ML on AWS

- **Amazon Bedrock** (foundation models, Knowledge Bases, Agents, Guardrails), SageMaker, Rekognition, Textract, Comprehend, Transcribe, Polly, Kendra

## 10. Architecture

- **Well-Architected Framework:** operational excellence, security, reliability, performance efficiency, cost optimization, sustainability
- High availability and disaster recovery strategies (backup/restore, pilot light, warm standby, multi-site)
- Serverless, event-driven, microservices, and multi-account reference architectures, migration strategies (the 7 Rs)

**Certifications path:** Cloud Practitioner → Solutions Architect Associate → Developer or SysOps/DevOps Engineer Professional → specialty (Security, Networking, ML).

---

# PART 6: Google Cloud Platform (GCP)

## 1. Foundations

- Regions, zones, resource hierarchy (Organization → Folders → Projects → Resources), `gcloud` CLI, Cloud Shell, Console, client libraries
- **IAM:** members, roles (basic, predefined, custom), service accounts, workload identity federation, organization policies, policy inheritance
- Billing accounts, budgets and alerts, quotas, labels, committed use discounts, Spot VMs

## 2. Compute

- **Compute Engine:** machine families, custom machine types, managed instance groups, instance templates, preemptible/Spot, persistent disks, startup scripts
- **GKE:** Standard vs Autopilot, node pools, Workload Identity, Gateway and Ingress, Config Sync, Anthos/Fleet
- **Cloud Run** (services and jobs), **Cloud Functions**, App Engine, Batch

## 3. Networking

- VPC (global, auto vs custom mode subnets), firewall rules, routes, Shared VPC, VPC peering, Private Google Access, Private Service Connect, Cloud NAT
- Cloud Load Balancing (global vs regional, external vs internal), Cloud CDN, Cloud DNS, Cloud Armor, Cloud VPN, Cloud Interconnect, Network Intelligence Center

## 4. Storage and Databases

- **Cloud Storage:** classes (Standard, Nearline, Coldline, Archive), lifecycle, signed URLs, uniform bucket-level access
- Persistent Disk, Filestore
- **Databases:** Cloud SQL, AlloyDB, **Spanner** (globally consistent relational), Firestore, Bigtable, Memorystore, BigQuery

## 5. Data and Analytics

- **BigQuery:** datasets, partitioning, clustering, slots, BigQuery ML, streaming inserts, materialized views, cost control
- Pub/Sub, Dataflow (Apache Beam), Dataproc, Dataform, Composer (Airflow), Looker, Data Fusion, Datastream

## 6. AI/ML on GCP

- **Vertex AI:** Model Garden, Gemini API, Agent Builder, pipelines, training, endpoints, feature store, vector search
- Document AI, Vision, Speech-to-Text, Natural Language, Translation, TPUs and GPUs

## 7. Security, Operations, and DevOps

- Cloud KMS, Secret Manager, Security Command Center, VPC Service Controls, Binary Authorization, Identity-Aware Proxy, Certificate Authority Service
- **Observability:** Cloud Monitoring, Cloud Logging, Cloud Trace, Error Reporting, Profiler, managed Prometheus
- **CI/CD and IaC:** Cloud Build, Artifact Registry, Cloud Deploy, Terraform on GCP, Deployment Manager (legacy), Config Connector
- Google Cloud Architecture Framework, SRE practices (GCP's strongest cultural contribution)

**Certifications path:** Cloud Digital Leader → Associate Cloud Engineer → Professional Cloud Architect / DevOps Engineer / Security Engineer / Data Engineer.

---

## AWS vs GCP Quick Map

| Need | AWS | GCP |
|---|---|---|
| VMs | EC2 | Compute Engine |
| Containers (managed K8s) | EKS | GKE |
| Serverless containers | Fargate / App Runner | Cloud Run |
| Functions | Lambda | Cloud Functions |
| Object storage | S3 | Cloud Storage |
| Relational DB | RDS / Aurora | Cloud SQL / AlloyDB / Spanner |
| NoSQL | DynamoDB | Firestore / Bigtable |
| Data warehouse | Redshift | BigQuery |
| Messaging | SQS / SNS | Pub/Sub |
| IaC | CloudFormation / CDK | Terraform / Config Connector |
| Registry | ECR | Artifact Registry |
| AI platform | Bedrock / SageMaker | Vertex AI |

---

## Suggested Learning Order

1. **Linux, networking, Git, Bash** (2 to 3 weeks of focused practice)
2. **Docker and Docker Hub:** containerize a real app, write multi-stage builds, use Compose
3. **CI/CD:** GitHub Actions pipeline that builds, tests, scans, and pushes an image
4. **Terraform:** provision real infrastructure instead of clicking
5. **One cloud deeply** (AWS has the most jobs; GCP has the cleanest developer experience), then map concepts to the other
6. **Kubernetes:** start with kind or minikube, then a managed cluster (EKS or GKE), then Helm and ArgoCD
7. **Observability and security:** Prometheus, Grafana, Vault, Trivy
8. **SRE practices:** SLOs, incident response, chaos testing

## Projects to Practice

- Containerize a multi-service app and push it to Docker Hub and a private registry
- Full CI/CD: commit → test → image scan → push → deploy to Kubernetes via GitOps
- Three-tier AWS architecture with Terraform (VPC, ALB, ASG, RDS)
- Deploy the same app on AWS and GCP to compare
- Kubernetes cluster with autoscaling, ingress, TLS, monitoring, and alerts
- Write a custom Kubernetes operator
- Run a disaster recovery drill (restore from backup, fail over regions)

Cloud and Kubernetes features change quickly, so check official docs for current service names, versions, and pricing. For books, *The Phoenix Project*, *Site Reliability Engineering* (Google), *Kubernetes Up & Running*, and *Terraform: Up & Running* are the strongest starting points. I can also turn any part into a week-by-week plan or a hands-on lab sequence.