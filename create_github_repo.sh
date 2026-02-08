#!/bin/bash

# 脚本：创建新的 GitHub 仓库并推送代码
# 使用方法：GITHUB_TOKEN=your_token ./create_github_repo.sh [repo_name] [username]

REPO_NAME=${1:-"financeflow"}
USERNAME=${2:-"jianminy931020-coder"}
GITHUB_TOKEN=${GITHUB_TOKEN:-""}

if [ -z "$GITHUB_TOKEN" ]; then
    echo "错误: 需要设置 GITHUB_TOKEN 环境变量"
    echo "使用方法: GITHUB_TOKEN=your_token ./create_github_repo.sh [repo_name] [username]"
    exit 1
fi

echo "正在创建 GitHub 仓库: $USERNAME/$REPO_NAME"

# 创建仓库
RESPONSE=$(curl -s -w "\n%{http_code}" -X POST \
  -H "Authorization: token $GITHUB_TOKEN" \
  -H "Accept: application/vnd.github.v3+json" \
  https://api.github.com/user/repos \
  -d "{\"name\":\"$REPO_NAME\",\"private\":false,\"description\":\"Personal Wealth Tracker - FinanceFlow\"}")

HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
BODY=$(echo "$RESPONSE" | sed '$d')

if [ "$HTTP_CODE" -eq 201 ]; then
    echo "✓ 仓库创建成功: https://github.com/$USERNAME/$REPO_NAME"
    
    # 更新远程仓库 URL
    git remote remove origin 2>/dev/null
    git remote add origin "https://github.com/$USERNAME/$REPO_NAME.git"
    
    echo "✓ 远程仓库已更新"
    
    # 推送代码
    echo "正在推送代码..."
    git push -u origin main
    
    if [ $? -eq 0 ]; then
        echo "✓ 代码推送成功！"
        echo "仓库地址: https://github.com/$USERNAME/$REPO_NAME"
    else
        echo "⚠ 推送失败，请检查网络连接和权限"
    fi
else
    echo "✗ 创建仓库失败 (HTTP $HTTP_CODE)"
    echo "响应: $BODY"
    exit 1
fi
