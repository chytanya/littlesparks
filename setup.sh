#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────
#  LittleSparks Prints — Local Setup Script
#  Run: bash setup.sh
# ─────────────────────────────────────────────────────────────

set -e

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

echo ""
echo -e "${BLUE}✏️  LittleSparks Prints — Local Setup${NC}"
echo "────────────────────────────────────────"

# ── 1. Check Node.js ──────────────────────────────────────────
echo ""
echo -e "${YELLOW}[1/5] Checking Node.js...${NC}"
if ! command -v node &> /dev/null; then
  echo -e "${RED}✗ Node.js not found. Install from https://nodejs.org (v18+)${NC}"
  exit 1
fi
NODE_VER=$(node -v)
echo -e "${GREEN}✓ Node.js $NODE_VER found${NC}"

# ── 2. Install frontend deps ──────────────────────────────────
echo ""
echo -e "${YELLOW}[2/5] Installing frontend dependencies...${NC}"
npm install
echo -e "${GREEN}✓ Frontend dependencies installed${NC}"

# ── 3. Install function deps ──────────────────────────────────
echo ""
echo -e "${YELLOW}[3/5] Installing Netlify function dependencies...${NC}"
cd netlify/functions && npm install && cd ../..
echo -e "${GREEN}✓ Function dependencies installed${NC}"

# ── 4. Set up .env ────────────────────────────────────────────
echo ""
echo -e "${YELLOW}[4/5] Setting up environment variables...${NC}"
if [ ! -f .env ]; then
  cp .env.example .env
  echo -e "${GREEN}✓ .env file created from .env.example${NC}"
  echo -e "${YELLOW}  ⚠  Open .env and fill in your Stripe + SendGrid keys before testing payments${NC}"
else
  echo -e "${GREEN}✓ .env file already exists${NC}"
fi

# ── 5. Check for Netlify CLI ──────────────────────────────────
echo ""
echo -e "${YELLOW}[5/5] Checking Netlify CLI...${NC}"
if command -v netlify &> /dev/null; then
  echo -e "${GREEN}✓ Netlify CLI found${NC}"
  NETLIFY_AVAILABLE=true
else
  echo -e "${YELLOW}  Netlify CLI not found — installing globally...${NC}"
  npm install -g netlify-cli && NETLIFY_AVAILABLE=true || NETLIFY_AVAILABLE=false
fi

# ── Done ──────────────────────────────────────────────────────
echo ""
echo "────────────────────────────────────────"
echo -e "${GREEN}✅ Setup complete!${NC}"
echo ""
echo -e "${BLUE}How to run locally:${NC}"
echo ""

if [ "$NETLIFY_AVAILABLE" = true ]; then
  echo -e "  ${GREEN}Option A — Full stack (recommended):${NC}"
  echo "  netlify dev"
  echo "  → http://localhost:8888"
  echo ""
fi

echo -e "  ${GREEN}Option B — Frontend only (no payments):${NC}"
echo "  npm run dev"
echo "  → http://localhost:3000"
echo ""
echo -e "${YELLOW}📝 Before testing payments:${NC}"
echo "  1. Open .env and add your VITE_STRIPE_PUBLISHABLE_KEY"
echo "  2. Add STRIPE_SECRET_KEY"
echo "  3. Use Stripe test card: 4242 4242 4242 4242"
echo ""
echo -e "${BLUE}Full setup guide: README.md${NC}"
echo ""
