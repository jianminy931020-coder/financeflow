# 使用 MCP 创建 GitHub 仓库指南

## 📋 准备工作

### 1. 获取 GitHub Personal Access Token

1. 访问: https://github.com/settings/tokens
2. 点击 **"Generate new token (classic)"**
3. 设置名称: `fianceflow-repo-creation`
4. 选择权限: ✅ **`repo`** (完整仓库权限)
5. 点击 **"Generate token"**
6. **复制并保存 token**（只显示一次）

### 2. 使用方法

#### 方法 1: 使用 Python 脚本（推荐）

```bash
cd /Users/inkensatoshi/Desktop/web3/financeflow

# 方式 1: 使用环境变量
export GITHUB_TOKEN=your_token_here
python3 create_repo_mcp.py

# 方式 2: 直接传递 token 作为参数
python3 create_repo_mcp.py your_token_here
```

#### 方法 2: 使用 Shell 脚本

```bash
cd /Users/inkensatoshi/Desktop/web3/financeflow
GITHUB_TOKEN=your_token_here ./create_github_repo.sh fianceflow jianminy931020-coder
```

#### 方法 3: 使用 curl 直接调用 API

```bash
cd /Users/inkensatoshi/Desktop/web3/financeflow

# 创建仓库
curl -X POST \
  -H "Authorization: token YOUR_TOKEN" \
  -H "Accept: application/vnd.github.v3+json" \
  https://api.github.com/user/repos \
  -d '{"name":"fianceflow","description":"Personal Wealth Tracker - FinanceFlow","private":false}'

# 更新远程仓库
git remote remove origin
git remote add origin https://github.com/jianminy931020-coder/fianceflow.git

# 推送代码
git push -u origin main
```

## ✅ 脚本会自动完成

- ✅ 创建新的 GitHub 仓库 `fianceflow`
- ✅ 更新 git remote 指向新仓库
- ✅ 推送本地代码到 GitHub

## 🔗 仓库地址

创建成功后，仓库地址将是:
```
https://github.com/jianminy931020-coder/fianceflow
```
