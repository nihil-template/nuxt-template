/**
 * 대형 이미지를 타일로 분할하는 스크립트
 * 
 * 사용법:
 * 1. 원본 이미지를 public/maps/luxterra-original.jpg 로 배치
 * 2. pnpm tsx scripts/generate-tiles.ts 실행
 * 3. public/tiles/luxterra/ 폴더에 타일 생성됨
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.join(__dirname, '..')

// 설정
const CONFIG = {
  inputImage: path.join(rootDir, 'public/maps/luxterra-original.jpg'),
  outputDir: path.join(rootDir, 'public/tiles/luxterra'),
  tileSize: 512,
  maxZoom: 4, // 2^4 = 16 배 확대
}

async function generateTiles() {
  if (!fs.existsSync(CONFIG.inputImage)) {
    console.error('❌ 원본 이미지를 찾을 수 없습니다:', CONFIG.inputImage)
    console.log('원본 이미지를 public/maps/luxterra-original.jpg 로 배치해주세요.')
    return
  }

  // 이미지 메타데이터 읽기
  const metadata = await sharp(CONFIG.inputImage).metadata()
  const width = metadata.width!
  const height = metadata.height!
  
  console.log(`📐 원본 이미지 크기: ${width} x ${height}`)

  // 출력 디렉토리 생성
  if (fs.existsSync(CONFIG.outputDir)) {
    fs.rmSync(CONFIG.outputDir, { recursive: true })
  }
  fs.mkdirSync(CONFIG.outputDir, { recursive: true })

  // 각 줌 레벨마다 타일 생성
  for (let zoom = 0; zoom <= CONFIG.maxZoom; zoom++) {
    const scale = Math.pow(2, zoom)
    const scaledWidth = Math.floor(width / scale)
    const scaledHeight = Math.floor(height / scale)
    
    console.log(`\n🔍 Zoom ${zoom}: ${scaledWidth} x ${scaledHeight}`)
    
    const zoomDir = path.join(CONFIG.outputDir, zoom.toString())
    fs.mkdirSync(zoomDir, { recursive: true })

    // 타일 개수 계산
    const tilesX = Math.ceil(scaledWidth / CONFIG.tileSize)
    const tilesY = Math.ceil(scaledHeight / CONFIG.tileSize)
    
    console.log(`   타일 수: ${tilesX} x ${tilesY} = ${tilesX * tilesY} 개`)

    // 타일 생성
    for (let y = 0; y < tilesY; y++) {
      for (let x = 0; x < tilesX; x++) {
        const left = x * CONFIG.tileSize
        const top = y * CONFIG.tileSize
        const tileWidth = Math.min(CONFIG.tileSize, scaledWidth - left)
        const tileHeight = Math.min(CONFIG.tileSize, scaledHeight - top)

        // 타일 추출
        const tile = await sharp(CONFIG.inputImage)
          .extract({
            left: Math.floor(left * scale),
            top: Math.floor(top * scale),
            width: Math.floor(tileWidth * scale),
            height: Math.floor(tileHeight * scale),
          })
          .resize(Math.floor(tileWidth * scale / scale), Math.floor(tileHeight * scale / scale))
          .webp({ quality: 85 })
          .toBuffer()

        // 타일 저장
        const tilePath = path.join(zoomDir, `${x}-${y}.webp`)
        fs.writeFileSync(tilePath, tile)
      }
    }
  }

  console.log('\n✅ 타일 생성 완료!')
  console.log(`📁 출력 위치: ${CONFIG.outputDir}`)
  
  // 총 파일 수 계산
  let totalTiles = 0
  for (let z = 0; z <= CONFIG.maxZoom; z++) {
    const zoomDir = path.join(CONFIG.outputDir, z.toString())
    const files = fs.readdirSync(zoomDir)
    totalTiles += files.length
  }
  console.log(`📊 총 타일 수: ${totalTiles} 개`)
}

generateTiles().catch(console.error)
