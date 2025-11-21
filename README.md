# Gachiroun Strapi (Migration to Render & Supabase)

이 프로젝트는 Strapi 백엔드 애플리케이션으로, **Render(Runtime)** 와 **Supabase(Database)** 를 사용하여 무료 티어에서도 안정적으로 운영되도록 구성되었습니다.

## 🏗 아키텍처 (Architecture)

```mermaid
graph TD
    User[User / Frontend] -->|HTTPS| Render[Render (Strapi Backend)]
    
    subgraph "Hosting (Free Tier)"
        Render
    end
    
    subgraph "Database (Free Tier)"
        Render -->|PostgreSQL Protocol| Supabase[(Supabase DB)]
    end
    
    subgraph "Automation"
        GH_Actions[GitHub Actions] -->|Ping (Every 14m)| Render
        note[Daytime Keep Awake<br/>08:00 ~ 24:00 KST] -.-> GH_Actions
    end

    style Render fill:#d4e1f5,stroke:#333,stroke-width:2px
    style Supabase fill:#d5f5e3,stroke:#333,stroke-width:2px
    style GH_Actions fill:#fce4ec,stroke:#333,stroke-width:2px
```

### 1. Runtime: Render (Free Tier)
- **Hosting**: Render Web Service (Node.js)
- **Cold Start 방지 전략**:
    - Render의 무료 티어는 15분간 활동이 없으면 Sleep 모드로 전환됩니다.
    - 이를 방지하기 위해 **GitHub Actions**를 사용하여 **활동 시간(08:00 ~ 24:00 KST)** 동안 14분마다 핑을 보냅니다.
    - 새벽 시간(00:00 ~ 08:00 KST)에는 핑을 보내지 않아 Sleep 모드로 전환되며, 무료 사용량(월 750시간)을 절약합니다.

### 2. Database: Supabase (Free Tier)
- **Production**: PostgreSQL (Supabase)
    - Cold Start가 없어 언제든 즉시 응답 가능합니다.
    - `pg` 드라이버를 사용하여 연결합니다.
- **Development (Local)**: SQLite
    - 로컬 개발 시에는 간편한 SQLite를 그대로 사용합니다.

### 3. Infrastructure as Code (IaC)
- **`render.yaml`**: Render 배포 설정을 코드로 관리합니다 (Blueprint).
- **`.github/workflows/keep-awake.yml`**: Daytime Keep Awake 자동화 스크립트입니다.

---

## 🚀 배포 방법 (Deployment)

### 1. 사전 준비
- GitHub 저장소에 코드가 Push 되어 있어야 합니다.
- Supabase 프로젝트가 생성되어 있어야 합니다.

### 2. Render 설정
1.  Render 대시보드에서 **New > Blueprint** 선택.
2.  이 GitHub 저장소를 연결.
3.  `render.yaml`이 감지되면 **Apply** 클릭.

### 3. 환경 변수 설정 (Environment Variables)
Render 배포 시 또는 배포 후 **Environment** 탭에서 다음 변수들을 설정해야 합니다.

| Key | Value (Example) | 설명 |
| :--- | :--- | :--- |
| `DATABASE_HOST` | `aws-1-ap-southeast-2.pooler.supabase.com` | Supabase Connection Pooling URL |
| `DATABASE_PASSWORD` | `your-db-password` | Supabase DB 비밀번호 |
| `ADMIN_JWT_SECRET` | `random-string` | 관리자 패널 인증용 시크릿 (임의 생성) |
| `APP_KEYS` | `key1,key2` | 앱 키 (임의 생성, 콤마로 구분) |
| `API_TOKEN_SALT` | `random-string` | API 토큰 솔트 (임의 생성) |
| `TRANSFER_TOKEN_SALT` | `random-string` | 전송 토큰 솔트 (임의 생성) |
| `JWT_SECRET` | `random-string` | JWT 시크릿 (임의 생성) |
| `ENCRYPTION_KEY` | `random-string` | 데이터 암호화 키 (임의 생성) |

---

## 🛠 로컬 개발 (Local Development)

```bash
# 의존성 설치
npm install

# 개발 서버 실행 (SQLite 사용)
npm run develop
```
