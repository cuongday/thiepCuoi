import { useState, useRef, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

const IMAGES = {
  hero: 'https://statics.pancake.vn/web-media/47/01/d7/17/8804b2aaaf7d26c01c1815b62dfa230900cdf0cc0504bfabd6bbdbdb-w:313-h:313-l:12891-t:image/webp.webp',
  flower: 'https://statics.pancake.vn/web-media/c0/c3/e2/b8/a15250ddb91ede08f8ba8e6cd81289b173efe15f1002fd3f4378a130-w:481-h:481-l:19283-t:image/webp.webp',
  heart: 'https://statics.pancake.vn/web-media/60/ac/cb/5a/7fdcd160f415f1fcfbdcb068ee6c14e6c0e3ae302ebb9a00ec898806-w:313-h:313-l:3431-t:image/webp.webp',
  mapMarker: 'https://statics.pancake.vn/web-media/c9/7a/8a/e3/fb960ea4f4e39ac38adbbf4a43056dbd6a0aaf1e6cff9583e78c6d17-w:313-h:313-l:5539-t:image/webp.webp',
  qrCode: 'https://statics.pancake.vn/web-media/ef/a4/38/5e/15e40be995e3b9e588ae0a0ca1d7c3ff0465711cc07308837af54430-w:586-h:652-l:51250-t:image/jpeg.jpg',
  heartIcon: 'https://statics.pancake.vn/web-media/e1/9d/4c/50/671e154c9e28f0220e7fe187becbba9dcd39696ffc258b71f57b9dbe-w:100-h:100-l:3087-t:image/webp.webp',
  bride1: 'https://statics.pancake.vn/web-media/10/8a/c7/a3/4469b23a30640d824081431e33cfd219c78e0717425798aed85f1535-w:1080-h:1440-l:167241-t:image/jpeg.jpg',
  bride2: 'https://statics.pancake.vn/web-media/ba/87/8e/98/5b47f056d251a6b8bb4861fe26e96bff44e06e4543af717b5d2d8b23-w:1080-h:1440-l:133805-t:image/jpeg.jpg',
  bride3: 'https://content.pancake.vn/1/8b/6f/dd/fb/cf5ecf59198594e070980d032f42a099ebb38e3442cb170ccde55c52-w:200-h:200-l:190831-t:image/webp-ANIM.gif',
  envelopeClosed: 'https://statics.pancake.vn/web-media/ce/0a/61/8b/bb03b54cdc80770d87986c12ef4d3aea6b8fb377ea55a84f33dec762-w:750-h:1050-l:9424-t:image/webp.webp',
  envelopeOpen: '/thiepmo.png',
  envelopeOpen2: 'https://content.pancake.vn/web-media/52/44/cd/4a/7ede4a56397999b667019a92043a9dcf7165e1b916ff1973db325148-w:750-h:1050-l:15848-t:image/webp.webp',
  image1: 'https://content.pancake.vn/1/s651x869/fwebp80/b8/a9/be/33/645ec95fdf293c645381a4aefd65aada76ac2c12e1a08201bf323dd5-w:1919-h:2560-l:363328-t:image/jpeg.jpg',
}

function FadeIn({ children, delay = 0 }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-30px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

// Border decoration component
function BorderDecoration() {
  return (
    <div style={{
      position: 'absolute',
      top: '15px',
      left: '15px',
      right: '15px',
      bottom: '15px',
      border: '1px solid #c41e3a',
      borderRadius: '8px',
      pointerEvents: 'none',
    }}>
      <div style={{
        position: 'absolute',
        top: '8px',
        left: '8px',
        right: '8px',
        bottom: '8px',
        border: '1px solid #c41e3a',
        borderRadius: '6px',
      }} />
    </div>
  )
}

// Corner decoration
function CornerDecoration({ position }) {
  const positions = {
    topLeft: { top: '5px', left: '5px', transform: 'rotate(0deg)' },
    topRight: { top: '5px', right: '5px', transform: 'rotate(90deg)' },
    bottomLeft: { bottom: '5px', left: '5px', transform: 'rotate(-90deg)' },
    bottomRight: { bottom: '5px', right: '5px', transform: 'rotate(180deg)' },
  }
  return (
    <svg
      width="30"
      height="30"
      style={{ position: 'absolute', ...positions[position] }}
      viewBox="0 0 30 30"
    >
      <path
        d="M0 30 L0 10 Q0 0 10 0 L30 0"
        fill="none"
        stroke="#c41e3a"
        strokeWidth="2"
      />
    </svg>
  )
}

export default function Maudotrang() {
  const [isOpened, setIsOpened] = useState(false)
  const [showWeddingPhoto, setShowWeddingPhoto] = useState(false)
  const [showContent, setShowContent] = useState(false)
  const [formData, setFormData] = useState({
    full_name: '',
    address: '',
    select_1: '',
    BanlagicuaDauRe: '',
  })

  const handleOpen = () => setIsOpened(true)

  useEffect(() => {
    if (isOpened) {
      const timer1 = setTimeout(() => setShowWeddingPhoto(true), 300)
      const timer2 = setTimeout(() => setShowContent(true), 1200)
      return () => {
        clearTimeout(timer1)
        clearTimeout(timer2)
      }
    }
  }, [isOpened])

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Cảm ơn bạn đã xác nhận tham dự!')
  }

  const openMap = () => {
    window.open('https://www.google.com/maps/place/20%C2%B031%2704.3%22N+106%C2%B010%2719.6%22E/@20.5178529,106.1721151,17z/data=!3m1!4b1!4m4!3m3!8m2!3d20.5178529!4d106.1721151?entry=ttu&g_ep=EgoyMDI2MDQxMi4wIKXMDSoASAFQAw%3D%3D', '_blank')
  }

  return (
    <div style={{
      maxWidth: '420px',
      margin: '0 auto',
      minHeight: '100vh',
      background: '#fefcf8',
      position: 'relative',
      overflowX: 'hidden',
      // fontFamily: '"Playfair Display", "Times New Roman", serif'
    }}>

      {/* ==================== SECTION 1: ENVELOPE COVER ==================== */}
      <section style={{
        position: 'relative',
        width: '100%',
        minHeight: '60vh',
        background: 'linear-gradient(135deg, #fefcf8 0%, #f5efe6 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}>
        {isOpened && (

          <div style={
            {
              position: 'absolute',
              top: '20px',
              left: '20px',
              right: '20px',
              bottom: '20px',
              background: 'linear-gradient(135deg, #fefcf8 0%, #f5efe6 100%)',
              borderRadius: '10px',
              padding: '20px',
              textAlign: 'center',
            }
          } className="container">
            <h2 style={{

              fontFamily: "'UTM-Sloop', sans-serif",
              fontSize: '28px',
              letterSpacing: '1px',
              textAlign: 'center',
              margin: '10px 0',
              padding: '8px 20px',

            }}>Trân Trọng Kính Mời</h2>
            <h4 style={{

              fontFamily: "'UTM-Sloop', sans-serif",
              fontSize: '28px',
              letterSpacing: '1px',
              textAlign: 'center',
              margin: '10px 0',
              padding: '8px 20px',

            }} className="">Quý Khách</h4>
          </div>
        )}
        {/* Corner decorations */}
        <CornerDecoration position="topLeft" />
        <CornerDecoration position="topRight" />
        <CornerDecoration position="bottomLeft" />
        <CornerDecoration position="bottomRight" />


        <motion.div
          key="envelope"
          onClick={handleOpen}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          style={{
            position: 'relative',
            maxWidth: '260px',
            width: '100%',
            aspectRatio: '1919 / 2560',
          }}
        >
          {!isOpened && (
            <img
              src={IMAGES.envelopeClosed}
              alt="Envelope"
              style={{
                width: '100%',
                borderRadius: '8px',
                position: 'absolute',
                top: '80px',
                left: 0,
              }}
            />
          )}

          {isOpened && (
            <>
              <div style={{
                position: 'absolute',
                top: '160px',
                left: 0,
                width: '100%',
                height: '100%',
                backgroundImage: `url(${IMAGES.envelopeOpen2})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center center',
                backgroundRepeat: 'no-repeat',
                borderRadius: '8px',
              }} />

              <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
                style={{
                  position: 'absolute',
                  top: '35%',
                  left: '10%',
                  width: '80%',
                  height: '60%',
                  backgroundImage: `url(${IMAGES.image1})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center center',
                  backgroundRepeat: 'no-repeat',
                  borderRadius: '6px',
                }}
              />

              <div
                style={{
                  position: 'absolute',
                  bottom: '-50%',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '100%',
                }}
              >
                <img
                  src={IMAGES.envelopeOpen}
                  alt="Envelope"
                  style={{
                    width: '100%',
                    borderRadius: '6px',
                  }}
                />
              </div>
            </>
          )}

          {!isOpened && (
            <motion.p
              style={{
                fontSize: '12px',
                color: '#c41e3a',
                fontWeight: '500',
                marginTop: '15px',
                textAlign: 'center',
                letterSpacing: '2px'
              }}
            >
              - NHẤP VÀO THIỆP ĐỂ MỞ -
            </motion.p>
          )}
        </motion.div>
      </section>

      {/* ==================== INNER CONTENT ==================== */}
      <AnimatePresence>
        {showContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >

            {/* ==================== SECTION 2: SAVE THE DATE HERO ==================== */}
            {/* <section style={{ 
              width: '100%', 
              background: 'linear-gradient(135deg, #c41e3a 0%, #8b0000 100%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '50px 20px',
              textAlign: 'center',
              position: 'relative'
            }}>
              <CornerDecoration position="topLeft" />
              <CornerDecoration position="topRight" />
              <CornerDecoration position="bottomLeft" />
              <CornerDecoration position="bottomRight" />
              
              <FadeIn>
                <p style={{ 
                  fontSize: '11px', 
                  color: '#fff', 
                  letterSpacing: '4px',
                  fontWeight: '400',
                  marginBottom: '15px'
                }}>SAVE THE DATE</p>
                
                <h1 style={{ 
                  fontSize: '42px', 
                  color: '#fff', 
                  fontWeight: '700',
                  lineHeight: 1.1,
                  textShadow: '0 2px 4px rgba(0,0,0,0.2)'
                }}>30.11.2026</h1>
                
                <motion.img 
                  src={IMAGES.heart} 
                  alt="" 
                  style={{ width: '30px', marginTop: '20px', opacity: 0.9 }}
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </FadeIn>
            </section> */}

            {/* ==================== SECTION 3: WE ARE GETTING MARRIED ==================== */}
            {/* <section style={{ 
              width: '100%', 
              background: '#fefcf8',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '50px 20px',
              textAlign: 'center',
              position: 'relative'
            }}>
              <BorderDecoration />
              
              <FadeIn>
                <p style={{ 
                  fontSize: '12px', 
                  color: '#c41e3a', 
                  letterSpacing: '3px',
                  marginBottom: '10px'
                }}>✦ ✦ ✦</p>
                
                <h2 style={{ 
                  fontSize: '32px', 
                  color: '#333', 
                  fontWeight: '600',
                  fontStyle: 'italic',
                  marginBottom: '10px'
                }}>We Are Getting Married</h2>
                
                <p style={{ 
                  fontSize: '13px', 
                  color: '#666',
                  marginBottom: '25px'
                }}>Trân Trọng Kính Mời</p>
                
                <div style={{
                  width: '60px',
                  height: '2px',
                  background: 'linear-gradient(90deg, transparent, #c41e3a, transparent)',
                  margin: '0 auto'
                }} />
              </FadeIn>
            </section> */}

            {/* ==================== SECTION 4B: NAME BANNER ==================== */}
            <section style={{
              width: '100%',
              background: '#fefcf8',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px 20px 30px',
              overflow: 'hidden',
            }}>
              <>
                {/* Top horizontal line */}
                <div style={{
                  width: '100%',
                  height: '1.5px',
                  background: 'linear-gradient(90deg, transparent, #8B1E2D, transparent)',
                  marginBottom: '16px',
                }} />

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '14px',
                  width: '100%',
                }}>
                  {/* Left decorative line */}
                  <div style={{
                    flex: 1,
                    maxWidth: '60px',
                    height: '1.5px',
                    background: 'linear-gradient(90deg, transparent, #8B1E2D)',
                  }} />

                  {/* Name 1 — slides from left */}
                  <motion.span
                    initial={{ opacity: 0, x: -80 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.9, delay: 0.3, ease: 'easeOut' }}
                    style={{
                      fontFamily: "'UTM-Sloop', sans-serif",
                      fontSize: '34px',
                      color: '#8B1E2D',
                      fontWeight: '400',
                      whiteSpace: 'nowrap',
                    }}
                  >Tăng Long</motion.span>

                  {/* Heart — pops in after names arrive */}
                  <motion.svg
                    width="30" height="30" viewBox="0 0 24 24"
                    style={{ flexShrink: 0 }}
                    initial={{ opacity: 0, scale: 0.3 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 1.1, ease: 'backOut' }}
                  >
                    <path
                      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                      fill="#8B1E2D"
                    />
                  </motion.svg>

                  {/* Name 2 — slides from right */}
                  <motion.span
                    initial={{ opacity: 0, x: 80 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.9, delay: 0.3, ease: 'easeOut' }}
                    style={{
                      fontFamily: "'UTM-Sloop', sans-serif",
                      fontSize: '34px',
                      color: '#8B1E2D',
                      fontWeight: '400',
                      whiteSpace: 'nowrap',
                    }}
                  >Trần Dinh</motion.span>

                  {/* Right decorative line */}
                  <div style={{
                    flex: 1,
                    maxWidth: '60px',
                    height: '1.5px',
                    background: 'linear-gradient(90deg, #8B1E2D, transparent)',
                  }} />
                </div>

                {/* Bottom horizontal line */}
                <div style={{
                  width: '100%',
                  height: '1.5px',
                  background: 'linear-gradient(90deg, transparent, #8B1E2D, transparent)',
                  marginTop: '16px',
                }} />
              </>
            </section>

            {/* ==================== SECTION 6: PARENTS ==================== */}
            <section style={{
              width: '100%',
              background: '#fff',
              display: 'inline-block',
              flexDirection: 'row',
              alignItems: 'stretch',
              justifyContent: 'center',
              padding: '30px 15px',
              gap: '20px'
            }}>
              {/* Nhà Trai */}
              <FadeIn>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  textAlign: 'right',
                  justifyContent: 'space-between',
                  padding: '20px 15px',
                  background: 'linear-gradient(180deg, #fefcf8 0%, #fff 100%)',
                  borderRadius: '12px',
                  minWidth: '140px'
                }}>
                  <div style={{
                    width: '80px',
                    height: '120px',
                    marginRight: '20px',
                    overflow: 'hidden',
                    border: '3px solid #c9a84c',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    marginBottom: '12px',
                    flexShrink: 0,
                  }}>
                    <img
                      src={IMAGES.bride1}
                      alt="Nhà trai"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                  </div>
                  <div>
                    <p style={{
                      fontSize: '13px',
                      color: '#c41e3a',
                      letterSpacing: '3px',
                      fontWeight: '700',
                      marginBottom: '8px',
                    }}>Nhà Trai</p>
                    <p style={{ fontSize: '14px', color: '#333', lineHeight: 1.6, fontWeight: '600' }}>Ông: Tăng Văn Thăng</p>
                    <p style={{ fontSize: '14px', color: '#333', lineHeight: 1.6, fontWeight: '600' }}>Bà: Phạm Thị Nhiễm</p>
                    <p style={{ fontSize: '12px', color: '#888', marginTop: '6px' }}>Bắc Thái Ninh, Hưng Yên</p>
                  </div>
                </div>
              </FadeIn>

              {/* Center heart icon */}
              <FadeIn delay={0.1}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0 5px'
                }}>
                  <img
                    src={IMAGES.heart}
                    alt=""
                    style={{ width: '28px', height: '28px' }}
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                </div>
              </FadeIn>

              {/* Nhà Gái */}
              <FadeIn delay={0.2}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  textAlign: 'left',
                  justifyContent: 'space-between',
                  padding: '20px 15px',
                  background: 'linear-gradient(180deg, #fefcf8 0%, #fff 100%)',
                  borderRadius: '12px',
                  minWidth: '140px'
                }}>
                  <div>
                    <p style={{
                      fontSize: '13px',
                      color: '#c41e3a',
                      letterSpacing: '3px',
                      fontWeight: '700',
                      marginBottom: '8px',
                    }}>Nhà Gái</p>
                    <p style={{ fontSize: '14px', color: '#333', lineHeight: 1.6, fontWeight: '600' }}>Ông: Trần Văn Cơ</p>
                    <p style={{ fontSize: '14px', color: '#333', lineHeight: 1.6, fontWeight: '600' }}>Bà: Trần Thị Tình</p>
                    <p style={{ fontSize: '12px', color: '#888', marginTop: '6px' }}>Nam Lý, Ninh Bình</p>
                  </div>
                  <div style={{
                    width: '80px',
                    height: '120px',
                    // borderRadius: '50%',
                    overflow: 'hidden',
                    marginLeft: '20px',
                    border: '3px solid #c9a84c',
                    justifyContent: 'end',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    marginBottom: '12px'
                  }}>
                    <img
                      src={IMAGES.bride2}
                      alt="Nhà gái"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                  </div>
                </div>
              </FadeIn>
            </section>

            {/* ==================== SECTION 4: COUPLE NAMES ==================== */}
            <section style={{
              width: '100%',
              background: '#fefcf8',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '30px 20px 50px',
              textAlign: 'center'
            }}>
              {/* Subtitle — bay từ dưới lên */}
              <motion.p
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                style={{
                  fontFamily: "'Cormorant Garamond', 'Tinos', serif",
                  fontSize: '22px',
                  fontWeight: '400',
                  fontStyle: 'italic',
                  letterSpacing: '0.3px',
                  color: '#222',
                  textAlign: 'center',
                  margin: '10px 0 4px',
                }}
              >Trân Trọng Báo Tin Lễ Thành Hôn Của</motion.p>

              {/* Tên Chú Rể — scale từ nhỏ ra to */}
              <motion.h1
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 1.0, delay: 0.3, ease: 'easeOut' }}
                style={{
                  fontSize: '39px',
                  color: '#c41e3a',
                  fontWeight: '700',
                  fontFamily: "'UTM-Sloop', sans-serif",
                  lineHeight: 1.2
                }}
              >Tăng Văn Long</motion.h1>

              {/* Chữ & — scale từ nhỏ ra to */}
              <motion.p
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 1.0, delay: 0.6, ease: 'easeOut' }}
                style={{
                  fontFamily: "'UTM-Sloop', sans-serif",
                  fontSize: '39px',
                  color: '#c41e3a',
                  fontWeight: '700',
                  lineHeight: 1.2
                }}
              >&amp;</motion.p>

              {/* Tên Cô Dâu — scale từ nhỏ ra to */}
              <motion.h1
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 1.0, delay: 0.9, ease: 'easeOut' }}
                style={{
                  fontSize: '39px',
                  color: '#333',
                  fontWeight: '700',
                  fontFamily: "'UTM-Sloop', sans-serif",
                  lineHeight: 1.2
                }}
              >Trần Thị Dinh</motion.h1>
            </section>

            {/* ==================== SECTION 5: WEDDING PHOTO ==================== */}
            <section style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '0 20px 20px',
              background: '#fefcf8'
            }}>
              {/* Ảnh lớn — bay từ dưới lên, mờ dần rõ */}
              <motion.div
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.9, ease: 'easeOut' }}
                style={{
                  width: '100%',
                  maxWidth: '320px',
                  aspectRatio: '3/4',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
                  position: 'relative'
                }}
              >
                <img
                  src={IMAGES.image1}
                  alt="Wedding"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                {/* Golden frame overlay */}
                <div style={{
                  position: 'absolute',
                  top: '10px', left: '10px', right: '10px', bottom: '10px',
                  border: '1.5px solid rgba(201, 168, 76, 0.5)',
                  borderRadius: '4px',
                  pointerEvents: 'none'
                }} />
              </motion.div>

              {/* Chữ "Trân Trọng Kính Mời" — trượt từ trái sang */}
              <motion.p
                initial={{ opacity: 0, x: -60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
                style={{
                  fontFamily: "'Cormorant Garamond', 'Tinos', serif",
                  fontSize: '28px',
                  fontWeight: '400',
                  fontStyle: 'italic',
                  color: '#333',
                  textAlign: 'center',
                  margin: '20px 0 16px',
                  letterSpacing: '0.3px',
                }}
              >Trân Trọng Kính Mời</motion.p>
            </section>

            {/* ==================== SECTION 5B: WEDDING GALLERY (3 IMAGES) ==================== */}
            <section style={{
              width: '100%',
              background: '#fefcf8',
              padding: '0 16px 50px',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'center',
              gap: '10px',
              height: '230px',
            }}>
              {/* Ảnh trái — bay từ dưới lên */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
                style={{
                  width: 'calc(33% - 7px)',
                  height: '160px',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.12)',
                  flexShrink: 0,
                }}
              >
                <img src={IMAGES.bride1} alt="Wedding 1" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </motion.div>

              {/* Ảnh giữa — cao hơn, bay từ dưới lên */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, delay: 0.0, ease: 'easeOut' }}
                style={{
                  width: 'calc(33% - 7px)',
                  height: '160px',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
                  flexShrink: 0,
                  zIndex: 2,
                  marginBottom: '40px',
                }}
              >
                <img src={IMAGES.bride2} alt="Wedding 2" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </motion.div>

              {/* Ảnh phải — bay từ dưới lên */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
                style={{
                  width: 'calc(33% - 7px)',
                  height: '160px',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.12)',
                  flexShrink: 0,
                }}
              >
                <img src={IMAGES.bride1} alt="Wedding 3" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </motion.div>
            </section>


            {/* ==================== SECTION 7: EVENT DETAILS - Tiệc 1 ==================== */}
            <section style={{
              width: '100%',
              background: 'linear-gradient(180deg, #fff 0%, #f9f6f1 100%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '40px 20px',
              textAlign: 'center',
              position: 'relative'
            }}>
              <CornerDecoration position="topLeft" />
              <CornerDecoration position="topRight" />

              <FadeIn>
                <div style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  border: '2px solid #c41e3a',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px auto'
                }}>
                  <img src={IMAGES.flower} alt="" style={{ width: '25px', opacity: 0.8 }} />
                </div>

                <h3 style={{
                  fontSize: '18px',
                  color: '#333',
                  fontWeight: '600',
                  marginBottom: '15px',
                  letterSpacing: '2px'
                }}>TIỆC MỪNG LỄ THÀNH HÔN</h3>

                <div style={{
                  width: '40px',
                  height: '2px',
                  background: '#c41e3a',
                  margin: '0 auto 20px'
                }} />

                <p style={{ fontSize: '13px', color: '#666', marginBottom: '8px' }}>
                  Vào Lúc <strong style={{ color: '#333' }}>10h00</strong> | <strong style={{ color: '#333' }}>Thứ 6</strong>
                </p>
                <p style={{ fontSize: '13px', color: '#666', marginBottom: '15px' }}>Ngày <strong style={{ color: '#c41e3a', fontSize: '20px' }}>03</strong> tháng <strong style={{ color: '#c41e3a', fontSize: '20px' }}>05</strong> năm <strong style={{ color: '#c41e3a', fontSize: '20px' }}>2026</strong></p>
                <p style={{ fontSize: '11px', color: '#888', marginBottom: '15px' }}>(Tức Ngày 17 Tháng 03 Năm Bính Ngọ)</p>

                <FadeIn>
                  <p style={{
                    fontSize: '11px',
                    color: '#fff',
                    letterSpacing: '4px',
                    marginBottom: '15px'
                  }}>ĐỊA ĐIỂM TỔ CHỨC</p>

                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3736.5774666666944!2d106.4931335!3d20.5235405!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjDCsDMxJzI0LjgiTiAxMDbCsDI5JzM1LjMiRQ!5e0!3m2!1svi!2s!4v1776269991480!5m2!1svi!2s"
                    width="100%"
                    maxWidth="400"
                    height="300"
                    style={{ border: '0', borderRadius: '12px' }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />

                  {/* <h3 style={{ 
                  fontSize: '20px', 
                  color: '#fff', 
                  fontWeight: '600',
                  marginTop: '20px',
                  marginBottom: '10px'
                }}>Trung Tâm Tổ Chức Tiệc Cưới</h3>
                
                <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.9)', marginBottom: '20px' }}>
                  Hồ Tây, Quận Tây Hồ, TP. Hà Nội
                </p>
                 */}
                  <button
                    onClick={openMap}
                    style={{
                      background: '#fff',
                      color: '#c41e3a',
                      border: 'none',
                      padding: '12px 30px',
                      borderRadius: '25px',
                      fontSize: '13px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      letterSpacing: '1px'
                    }}
                  >
                    XEM CHỈ ĐƯỜNG
                  </button>
                </FadeIn>
              </FadeIn>
            </section>

            {/* ==================== SECTION 8: DIVIDER ==================== */}
            <section style={{
              width: '100%',
              background: '#fefcf8',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '30px 20px',
              textAlign: 'center'
            }}>
              <FadeIn>
                <div style={{
                  width: '100%',
                  maxWidth: '200px',
                  height: '1px',
                  background: 'linear-gradient(90deg, transparent, #c41e3a, transparent)',
                  marginBottom: '20px'
                }} />
                <motion.img
                  src={IMAGES.heart}
                  alt=""
                  style={{ width: '30px', opacity: 0.6 }}
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <div style={{
                  width: '100%',
                  maxWidth: '200px',
                  height: '1px',
                  background: 'linear-gradient(90deg, transparent, #c41e3a, transparent)',
                  marginTop: '20px'
                }} />
              </FadeIn>
            </section>

            {/* ==================== SECTION 9: EVENT DETAILS - Tiệc 2 ==================== */}
            <section style={{
              width: '100%',
              background: 'linear-gradient(180deg, #f9f6f1 0%, #fff 100%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '40px 20px',
              textAlign: 'center',
              position: 'relative'
            }}>
              <CornerDecoration position="bottomLeft" />
              <CornerDecoration position="bottomRight" />

              <FadeIn>
                <div style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  border: '2px solid #c41e3a',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px auto'
                }}>
                  <img src={IMAGES.flower} alt="" style={{ width: '25px', opacity: 0.8 }} />
                </div>

                <h3 style={{
                  fontSize: '18px',
                  color: '#333',
                  fontWeight: '600',
                  marginBottom: '15px',
                  letterSpacing: '2px'
                }}>BUỔI TIỆC TẠI NHÀ GÁI</h3>

                <div style={{
                  width: '40px',
                  height: '2px',
                  background: '#c41e3a',
                  margin: '0 auto 20px'
                }} />

                <p style={{ fontSize: '13px', color: '#666', marginBottom: '8px' }}>
                  Vào Lúc <strong style={{ color: '#333' }}>13h00</strong> | <strong style={{ color: '#333' }}>Thứ 6</strong>
                </p>
                <p style={{ fontSize: '13px', color: '#666', marginBottom: '15px' }}>Ngày <strong style={{ color: '#c41e3a', fontSize: '20px' }}>30</strong> tháng <strong style={{ color: '#c41e3a', fontSize: '20px' }}>12</strong> năm <strong style={{ color: '#c41e3a', fontSize: '20px' }}>2026</strong></p>
                <p style={{ fontSize: '11px', color: '#888', marginBottom: '15px' }}>(Tức Ngày 10 Tháng 11 Năm Bính Ngọ)</p>

                <FadeIn>
                  <p style={{
                    fontSize: '11px',
                    color: '#fff',
                    letterSpacing: '4px',
                    marginBottom: '15px'
                  }}>ĐỊA ĐIỂM TỔ CHỨC</p>

                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3736.716303336399!2d106.1721151!3d20.517852899999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjDCsDMxJzA0LjMiTiAxMDbCsDEwJzE5LjYiRQ!5e0!3m2!1svi!2s!4v1776269470790!5m2!1svi!2s"
                    width="100%"
                    maxWidth="400"
                    height="300"
                    style={{ border: '0', borderRadius: '12px' }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />

                  {/* <h3 style={{ 
                  fontSize: '20px', 
                  color: '#fff', 
                  fontWeight: '600',
                  marginTop: '20px',
                  marginBottom: '10px'
                }}>Trung Tâm Tổ Chức Tiệc Cưới</h3>
                
                <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.9)', marginBottom: '20px' }}>
                  Hồ Tây, Quận Tây Hồ, TP. Hà Nội
                </p>
                 */}
                  <button
                    onClick={openMap}
                    style={{
                      background: '#fff',
                      color: '#c41e3a',
                      border: 'none',
                      padding: '12px 30px',
                      borderRadius: '25px',
                      fontSize: '13px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      letterSpacing: '1px'
                    }}
                  >
                    XEM CHỈ ĐƯỜNG
                  </button>
                </FadeIn>
              </FadeIn>
            </section>

            {/* ==================== SECTION 10: LOCATION ==================== */}

            {/* ==================== SECTION 11: RSVP ==================== */}
            <section style={{
              width: '100%',
              background: '#fefcf8',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '40px 20px',
              textAlign: 'center',
              position: 'relative'
            }}>
              <BorderDecoration />

              <FadeIn>
                <p style={{
                  fontSize: '11px',
                  color: '#c41e3a',
                  letterSpacing: '3px',
                  marginBottom: '10px'
                }}>✦ ✦ ✦</p>

                <h3 style={{
                  fontSize: '22px',
                  color: '#333',
                  fontWeight: '600',
                  marginBottom: '5px'
                }}>Xác Nhận Tham Dự</h3>

                <p style={{ fontSize: '12px', color: '#666', marginBottom: '25px' }}>
                  Gửi lời chúc đến Dâu Rể nhé!
                </p>

                <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '300px', marginTop: '10px' }}>
                  <input
                    type="text"
                    placeholder="Tên của Bạn"
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '14px 18px',
                      marginBottom: '12px',
                      border: '1px solid #e0d8cc',
                      borderRadius: '25px',
                      fontSize: '13px',
                      outline: 'none',
                      background: '#fff',
                      transition: 'border-color 0.3s',
                      fontFamily: 'inherit'
                    }}
                  />
                  <select
                    name="select_1"
                    value={formData.select_1}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '14px 18px',
                      marginBottom: '12px',
                      border: '1px solid #e0d8cc',
                      borderRadius: '25px',
                      fontSize: '13px',
                      background: '#fff',
                      outline: 'none',
                      fontFamily: 'inherit'
                    }}
                  >
                    <option value="">Bạn có tham dự không?</option>
                    <option value="yes">Có, tôi sẽ tham dự</option>
                    <option value="no">Rất tiếc, không thể tham dự</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Gửi lời chúc đến Dâu Rể"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '14px 18px',
                      marginBottom: '12px',
                      border: '1px solid #e0d8cc',
                      borderRadius: '25px',
                      fontSize: '13px',
                      outline: 'none',
                      background: '#fff',
                      fontFamily: 'inherit'
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Bạn là gì của Dâu Rể?"
                    name="BanlagicuaDauRe"
                    value={formData.BanlagicuaDauRe}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '14px 18px',
                      marginBottom: '12px',
                      border: '1px solid #e0d8cc',
                      borderRadius: '25px',
                      fontSize: '13px',
                      outline: 'none',
                      background: '#fff',
                      fontFamily: 'inherit'
                    }}
                  />
                  <button
                    type="submit"
                    style={{
                      width: '100%',
                      padding: '14px',
                      background: 'linear-gradient(135deg, #c41e3a 0%, #8b0000 100%)',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '25px',
                      fontSize: '14px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      marginTop: '5px',
                      letterSpacing: '1px'
                    }}
                  >
                    GỬI XÁC NHẬN
                  </button>
                </form>
              </FadeIn>
            </section>

            {/* ==================== SECTION 12: GALLERY ==================== */}
            <section style={{
              width: '100%',
              background: '#fff',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '40px 20px',
              textAlign: 'center'
            }}>
              <FadeIn>
                <h3 style={{
                  fontSize: '20px',
                  color: '#333',
                  fontWeight: '600',
                  marginBottom: '20px'
                }}>Album Hình Cưới</h3>

                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                  gap: '8px',
                  width: '100%'
                }}>
                  <img
                    src={IMAGES.bride1}
                    alt=""
                    style={{
                      width: '48%',
                      aspectRatio: '3/4',
                      objectFit: 'cover',
                      borderRadius: '8px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                    }}
                  />
                  <img
                    src={IMAGES.bride2}
                    alt=""
                    style={{
                      width: '48%',
                      aspectRatio: '3/4',
                      objectFit: 'cover',
                      borderRadius: '8px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                    }}
                  />
                  {/* <img 
                    src={IMAGES.bride3} 
                    alt="" 
                    style={{ 
                      width: '32%', 
                      aspectRatio: '1/1',
                      objectFit: 'cover', 
                      borderRadius: '8px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                    }} 
                  />
                  <img 
                    src={IMAGES.heartIcon} 
                    alt="" 
                    style={{ 
                      width: '32%', 
                      aspectRatio: '1/1',
                      objectFit: 'contain' 
                    }} 
                  />
                  <img 
                    src={IMAGES.bride3} 
                    alt="" 
                    style={{ 
                      width: '32%', 
                      aspectRatio: '1/1',
                      objectFit: 'cover', 
                      borderRadius: '8px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                    }} 
                  /> */}
                </div>
              </FadeIn>
            </section>

            {/* ==================== SECTION 13: SHARE LOVE / QR ==================== */}
            <section style={{
              width: '100%',
              background: 'linear-gradient(180deg, #f9f6f1 0%, #fff 100%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '40px 20px',
              textAlign: 'center',
              position: 'relative'
            }}>
              <BorderDecoration />

              <FadeIn>
                <p style={{
                  fontSize: '11px',
                  color: '#c41e3a',
                  letterSpacing: '3px',
                  marginBottom: '10px'
                }}>✦ ✦ ✦</p>

                <h3 style={{
                  fontSize: '22px',
                  color: '#333',
                  fontWeight: '600',
                  marginBottom: '8px'
                }}>Share The Love</h3>

                <p style={{
                  fontSize: '12px',
                  color: '#666',
                  marginBottom: '25px',
                  maxWidth: '280px'
                }}>
                  Thành ý chúc phúc và quà mừng của Quý khách xin được trân trọng ghi nhận
                </p>

                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '35px',
                  width: '100%',
                  flexWrap: 'wrap'
                }}>
                  <div style={{
                    textAlign: 'center',
                    padding: '20px',
                    background: '#fff',
                    borderRadius: '12px',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.08)'
                  }}>
                    <img
                      src={IMAGES.qrCode}
                      alt="QR"
                      style={{
                        width: '100px',
                        borderRadius: '8px',
                        marginBottom: '10px'
                      }}
                    />
                    <h5 style={{
                      fontSize: '13px',
                      color: '#333',
                      marginBottom: '5px',
                      fontWeight: '600'
                    }}>Chú Rể</h5>
                    <p style={{
                      fontSize: '11px',
                      color: '#666',
                      lineHeight: 1.5
                    }}>
                      CTK: <strong>Nguyễn Bình An</strong><br />
                      STK: 19036<br />
                      Vietcombank
                    </p>
                  </div>

                  <div style={{
                    textAlign: 'center',
                    padding: '20px',
                    background: '#fff',
                    borderRadius: '12px',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.08)'
                  }}>
                    <img
                      src={IMAGES.qrCode}
                      alt="QR"
                      style={{
                        width: '100px',
                        borderRadius: '8px',
                        marginBottom: '10px'
                      }}
                    />
                    <h5 style={{
                      fontSize: '13px',
                      color: '#333',
                      marginBottom: '5px',
                      fontWeight: '600'
                    }}>Cô Dâu</h5>
                    <p style={{
                      fontSize: '11px',
                      color: '#666',
                      lineHeight: 1.5
                    }}>
                      CTK: <strong>Nguyễn Phương Nga</strong><br />
                      STK: 19036<br />
                      Vietcombank
                    </p>
                  </div>
                </div>
              </FadeIn>
            </section>

            {/* ==================== SECTION 14: THANK YOU ==================== */}
            <section style={{
              width: '100%',
              background: 'linear-gradient(135deg, #c41e3a 0%, #8b0000 100%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '50px 20px',
              textAlign: 'center',
              position: 'relative'
            }}>
              <CornerDecoration position="topLeft" />
              <CornerDecoration position="topRight" />
              <CornerDecoration position="bottomLeft" />
              <CornerDecoration position="bottomRight" />

              <FadeIn>
                <motion.img
                  src={IMAGES.heart}
                  alt=""
                  style={{ width: '35px', marginBottom: '20px' }}
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />

                <h2 style={{
                  fontSize: '26px',
                  color: '#fff',
                  fontWeight: '600',
                  lineHeight: 1.4,
                  marginBottom: '15px'
                }}>
                  Rất Hân Hạnh<br />
                  Được Đón Tiếp!
                </h2>

                <div style={{
                  width: '40px',
                  height: '2px',
                  background: 'rgba(255,255,255,0.5)',
                  margin: '0 auto'
                }} />

                <p style={{
                  fontSize: '11px',
                  color: 'rgba(255,255,255,0.8)',
                  marginTop: '20px',
                  letterSpacing: '2px'
                }}>
                  ✦ Cảm Ơn Quý Khách ✦
                </p>
              </FadeIn>
            </section>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
