# UnraidClaw Browse — План покращення

## 🎯 Мета
Перетворити UnraidClaw Browse на потужний AI Gateway з зручним UI та розширеними можливостями.

---

## 📊 Фаза 1: Дизайн та UX (Високий пріоритет)

### 1.1 UI/UX Виправлення
- [x] **Виправлено** — CSS для світлої теми Unraid (білий текст на білому фоні)
- [ ] Додати перемикач тем (Dark/Light/System)
- [ ] Адаптивний дизайн для мобільних пристроїв
- [ ] Покращити читабельність таблиць
- [ ] Додати анімації для завантаження даних

### 1.2 Брендинг
- [x] **Виправлено** — Logo "UB" для UnraidClaw Browse
- [ ] Створити унікальний branding (колір, шрифти)
- [ ] Favicon для плагіна
- [ ] Donatello QR-code

---

## 🔧 Фаза 2: Функціональність (Високий пріоритет)

### 2.1 Нові API Endpoints
| Endpoint | Опис | Пріоритет |
|----------|------|-----------|
| `GET /api/disks/:id/browse` | Browse disk filesystem | ✅ Зроблено |
| `GET /api/shares/:name/browse` | Browse share filesystem | ✅ Зроблено |
| `GET /api/docker/templates` | Список Docker шаблонів | Medium |
| `POST /api/docker/templates/:id/create` | Створити з шаблону | Medium |
| `GET /api/system/stats` | Історичні метрики CPU/RAM | Low |
| `WS /api/ws` | WebSocket для real-time логів | Low |

### 2.2 OpenClaw Tools
| Tool | Опис | Пріоритет |
|------|------|-----------|
| `unraid_disk_browse` | Browse disk path | ✅ Зроблено |
| `unraid_share_browse` | Browse share path | ✅ Зроблено |
| `unraid_container_logs_stream` | Stream logs via WebSocket | Low |
| `unraid_system_stats` | Historical stats | Low |

### 2.3 Dashboard
- [ ] Real-time metrics (CPU, RAM, Disk usage) з графіками
- [ ] Quick actions (Start/Stop favorite containers)
- [ ] System health indicators
- [ ] Recent activity з часуовою шкалою

---

## 🛡️ Фаза 3: Безпека (Високий пріоритет)

### 3.1 Auth & Permissions
- [ ] OAuth2 support (Google, GitHub)
- [ ] JWT tokens замість SHA-256 API key
- [ ] Rate limiting UI (налаштування в плагіні)
- [ ] IP whitelist/blacklist

### 3.2 Audit
- [ ] Export logs в CSV/JSON
- [ ] Audit dashboard з фільтрами
- [ ] Alerting на підозрілу активність

---

## 📈 Фаза 4:监控 та Аналітика (Medium)

### 4.1 Моніторинг
- [ ] Prometheus metrics endpoint (`/metrics`)
- [ ] Grafana dashboard JSON
- [ ] Health check з деталями

### 4.2 Логування
- [ ] Structured JSON logging
- [ ] Log rotation налаштування
- [ ] Remote syslog forwarding

---

## 🔌 Фаза 5: Інтеграції (Medium)

### 5.1 Docker
- [ ] Docker Compose support
- [ ] Image management (pull, prune)
- [ ] Container stats (CPU, Memory history)

### 5.2 VM
- [ ] VM templates
- [ ] Snapshot management
- [ ] VM console access

### 5.3 System
- [ ] UPS monitoring (NUT)
- [ ] SMART data visualization
- [ ] Disk health history

---

## 🌐 Фаза 6: Developer Experience (Low)

### 6.1 API
- [ ] OpenAPI/Swagger docs
- [ ] API versioning
- [ ] GraphQL endpoint ( альтернатива REST)

### 6.2 Dev Tools
- [ ] Postman/Insomnia collection
- [ ] CLI tool для керування
- [ ] SDK для Node.js/Python

---

## 🚀 Фаза 7: Deployment (Medium)

### 7.1 Installation
- [ ] Docker container (альтернатива плагіну)
- [ ] Unraid CA template
- [ ] Ansible role

### 7.2 Updates
- [ ] Auto-update mechanism
- [ ] Changelog в UI
- [ ] Rollback support

---

## 📋 Пріоритетний Roadmap

```
Q2 2026:
├── Phase 1: UI Fix ✅
├── Phase 2: Core APIs
│   ├── Browse APIs ✅
│   ├── Docker templates
│   └── Real-time dashboard
└── Phase 3: Security

Q3 2026:
├── Phase 4: Monitoring
├── Phase 5: Integrations
└── Phase 6: Developer Tools
```

---

## 🐛 Known Issues

- [ ] Service auto-start after reboot
- [ ] TLS certificate renewal
- [ ] Permission matrix performance (100+ permissions)

---

## 💡 Ideas for Future

1. **AI-powered suggestions** — аналіз логів і пропозиції
2. **Natural language queries** — "show me containers using most CPU"
3. **Backup automation** — AI-scheduled backups
4. **Self-healing** — auto-restart failed services
5. **Multi-server dashboard** — керування кількома Unraid з одного місця

---

## 🤝 Contributing

Цей проект open-source. Fork, PR, feedback — вітаються!

**Repository:** https://github.com/oleksandrIIIradchenko/unraidclaw-browse
