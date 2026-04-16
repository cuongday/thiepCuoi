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
  gallery1: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=800&fit=crop',
  gallery2: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&h=800&fit=crop',
  gallery3: 'https://images.unsplash.com/photo-1529636798458-92182e662485?w=800&h=600&fit=crop',
  gallery4: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=600&h=600&fit=crop',
  gallery5: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&h=800&fit=crop',
  gallery6: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&h=600&fit=crop',
  gallery7: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=600&h=800&fit=crop',
  gallery8: 'https://images.unsplash.com/photo-1518623489648-a173ef7824f3?w=600&h=600&fit=crop',
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
    banCoDau: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  // Countdown to 03/05/2026 10:00
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  useEffect(() => {
    const target = new Date('2026-05-03T10:00:00')
    const tick = () => {
      const now = new Date()
      const diff = target - now
      if (diff <= 0) { setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 }); return }
      setCountdown({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      })
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

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

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.full_name || !formData.select_1 || !formData.banCoDau) {
      alert('Vui lòng điền đầy đủ thông tin!')
      return
    }
    setSubmitting(true)
    setSubmitStatus(null)
    try {
      await fetch('https://script.google.com/macros/s/AKfycbzg932WoC8T_dZy2oPnIF9SItVLUb5uxU_F9FbDbsnMmSwUPQKK2lUGuXDKZvCXs_ydEg/exec', {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          hoTen: formData.full_name,
          xacNhan: formData.select_1 === 'yes' ? 'Yes' : 'No',
          loiChuc: formData.address,
          banCoDau: formData.banCoDau === 'bride',
        }),
      })
      setSubmitStatus('success')
      setFormData({ full_name: '', address: '', select_1: '', banCoDau: '' })
    } catch {
      setSubmitStatus('error')
    } finally {
      setSubmitting(false)
    }
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


            {/* ==================== SECTION 7: EVENT DETAILS - Tiệc Nhà Trai ==================== */}
            <section style={{
              width: '100%',
              background: '#fff',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '40px 20px 36px',
              textAlign: 'center',
              position: 'relative',
            }}>
              <CornerDecoration position="topLeft" />
              <CornerDecoration position="topRight" />

              {/* TIỆC MỪNG LỄ THÀNH HÔN — bay từ trên xuống */}
              <motion.h3
                initial={{ opacity: 0, y: -30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                style={{
                  fontSize: '14px',
                  color: '#333',
                  fontWeight: '700',
                  letterSpacing: '2.5px',
                  marginBottom: '8px',
                }}
              >TIỆC MỪNG LỄ THÀNH HÔN</motion.h3>

              {/* Vào lúc — bay từ trên xuống */}
              <motion.p
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
                style={{ fontSize: '13px', color: '#666', marginBottom: '18px' }}
              >
                Vào Lúc <strong style={{ color: '#333' }}>10h00</strong> | <strong style={{ color: '#333' }}>Thứ 7</strong>
              </motion.p>

              {/* Hàng ngày tháng năm */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0',
                width: '100%',
                maxWidth: '320px',
                marginBottom: '12px',
              }}>
                {/* Tháng — từ trái vào */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
                  style={{ flex: 1, textAlign: 'right', paddingRight: '14px' }}
                >
                  <div style={{ fontSize: '13px', fontWeight: '600', color: '#444' }}>Tháng 05</div>
                </motion.div>

                {/* Separator + Ngày to dần */}
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{ width: '1px', height: '44px', background: '#bbb' }} />
                  <motion.div
                    initial={{ opacity: 0, scale: 0.4 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.8, delay: 0.5, ease: 'backOut' }}
                    style={{ padding: '0 18px', textAlign: 'center' }}
                  >
                    <div style={{ fontSize: '62px', fontWeight: '800', color: '#111', lineHeight: 1 }}>03</div>
                  </motion.div>
                  <div style={{ width: '1px', height: '44px', background: '#bbb' }} />
                </div>

                {/* Năm — từ phải vào */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
                  style={{ flex: 1, textAlign: 'left', paddingLeft: '14px' }}
                >
                  <div style={{ fontSize: '13px', fontWeight: '600', color: '#444' }}>2026</div>
                </motion.div>
              </div>

              {/* Âm lịch — fade in */}
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                style={{ fontSize: '12px', color: '#888', marginBottom: '10px' }}
              >(Tức Ngày 17 Tháng 03 Năm Bính Ngọ)</motion.p>

              {/* Địa điểm — bay từ dưới lên */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.7, delay: 1.0, ease: 'easeOut' }}
                style={{ fontSize: '14px', color: '#555', fontWeight: '600' }}
              >Tại Tư Gia Nhà Trai</motion.p>
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

            {/* ==================== SECTION 9: EVENT DETAILS - Tiệc Nhà Gái ==================== */}
            <section style={{
              width: '100%',
              background: '#f9f6f1',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '40px 20px',
              textAlign: 'center',
              position: 'relative',
            }}>
              <CornerDecoration position="bottomLeft" />
              <CornerDecoration position="bottomRight" />

              {/* Box viền */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                style={{
                  width: '100%',
                  maxWidth: '320px',
                  border: '1.5px solid #c9b99a',
                  borderRadius: '10px',
                  padding: '28px 20px',
                  background: '#fdfaf6',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                {/* TIỆC MỪNG LỄ THÀNH HÔN — to dần */}
                <motion.h3
                  initial={{ opacity: 0, scale: 0.6 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.7, delay: 0.1, ease: 'backOut' }}
                  style={{
                    fontSize: '14px',
                    color: '#333',
                    fontWeight: '800',
                    letterSpacing: '2px',
                    marginBottom: '8px',
                    fontStyle: 'italic',
                  }}
                >TIỆC MỪNG LỄ THÀNH HÔN</motion.h3>

                {/* Vào lúc — từ trên xuống */}
                <motion.p
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.6, delay: 0.25, ease: 'easeOut' }}
                  style={{ fontSize: '13px', color: '#666', marginBottom: '18px' }}
                >
                  Vào Lúc <strong style={{ color: '#333' }}>10h00</strong> | <strong style={{ color: '#333' }}>Thứ 7</strong>
                </motion.p>

                {/* Ngày — to dần */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.8, delay: 0.45, ease: 'backOut' }}
                  style={{
                    fontSize: '38px',
                    fontWeight: '800',
                    color: '#222',
                    letterSpacing: '2px',
                    lineHeight: 1.1,
                    marginBottom: '12px',
                  }}
                >03.05.2026</motion.div>

                {/* Âm lịch — bay từ dưới lên */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.6, delay: 0.7, ease: 'easeOut' }}
                  style={{ fontSize: '12px', color: '#888', fontStyle: 'italic', marginBottom: '8px' }}
                >(Tức Ngày 17 Tháng 03 Năm Bính Ngọ)</motion.p>

                {/* Địa điểm — bay từ dưới lên */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.6, delay: 0.9, ease: 'easeOut' }}
                  style={{ fontSize: '13px', color: '#555', fontWeight: '600', fontStyle: 'italic' }}
                >Buổi Tiệc Tổ Chức Tại Tư Gia Nhà Trai</motion.p>
              </motion.div>
            </section>

            {/* ==================== SECTION COUNTDOWN ==================== */}
            <section style={{
              width: '100%',
              background: '#fff',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '30px 20px',
              textAlign: 'center',
            }}>
              <FadeIn>
                <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                  {[{ v: countdown.days, l: 'Ngày' }, { v: countdown.hours, l: 'Giờ' }, { v: countdown.minutes, l: 'Phút' }, { v: countdown.seconds, l: 'Giây' }].map(({ v, l }) => (
                    <div key={l} style={{
                      width: '70px',
                      border: '1px solid #ccc',
                      borderRadius: '8px',
                      padding: '10px 6px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}>
                      <div style={{ height: '30px', overflow: 'hidden', position: 'relative' }}>
                        <AnimatePresence mode="popLayout">
                          <motion.span
                            key={v}
                            style={{
                              display: 'block',
                              fontSize: '18px',
                              fontWeight: '300',
                              color: '#000',
                              lineHeight: 1.3,
                              fontFamily: 'inherit',
                            }}
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -30, opacity: 0 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                          >
                            {String(v).padStart(2, '0')}
                          </motion.span>
                        </AnimatePresence>
                      </div>
                      <span style={{ fontSize: '16px', fontWeight: '300', color: '#000', marginTop: '2px' }}>{l}</span>
                    </div>
                  ))}
                </div>
              </FadeIn>
            </section>

            {/* ==================== SECTION CALENDAR ==================== */}
            <section style={{
              width: '100%',
              background: '#fefcf8',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '30px 20px 40px',
              textAlign: 'center',
            }}>
              <FadeIn>
                <p style={{ fontSize: '13px', fontWeight: '800', letterSpacing: '3px', color: '#333', marginBottom: '4px' }}>SAVE THE DATE</p>
                <p style={{ fontSize: '13px', fontWeight: '700', letterSpacing: '2px', color: '#333', marginBottom: '16px' }}>THÁNG 05 - 2026</p>

                {/* Calendar grid header */}
                <div style={{
                  width: '100%',
                  maxWidth: '340px',
                  background: '#8B1E2D',
                  borderRadius: '6px 6px 0 0',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(7, 1fr)',
                  padding: '6px 0',
                }}>
                  {['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'].map(d => (
                    <span key={d} style={{ color: '#fff', fontSize: '11px', fontWeight: '600', textAlign: 'center' }}>{d}</span>
                  ))}
                </div>

                {/* Calendar image with heart overlay on day 03 */}
                <div style={{ width: '100%', maxWidth: '340px', position: 'relative' }}>
                  <img
                    src="/calender2.png"
                    alt="Lịch tháng 05 2026"
                    style={{ width: '100%', display: 'block' }}
                  />
                  {/* Heart overlay on day 03 — column T7(col index 5), row 1 */}
                  <div style={{
                    position: 'absolute',
                    left: '71%',
                    top: '28%',
                    transform: 'translate(-50%, -50%)',
                    pointerEvents: 'none',
                  }}>
                    <motion.svg
                      width="42" height="38" viewBox="0 0 42 38"
                      animate={{ scale: [1, 1.2, 0.95, 1.18, 1] }}
                      transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      <path
                        d="M22 36 C22 36 4 24 4 12 C4 6.5 8.5 2 14 2 C17.5 2 20.5 3.8 22 6.5 C23.5 3.8 26.5 2 30 2 C35.5 2 40 6.5 40 12 C40 24 22 36 22 36Z"
                        fill="none"
                        stroke="#c41e3a"
                        strokeWidth="2.2"
                      />
                    </motion.svg>
                  </div>
                </div>
              </FadeIn>
            </section>

            {/* ==================== SECTION 10: LOCATION ==================== */}
            <section style={{
              width: '100%',
              background: '#fff',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '36px 20px',
              textAlign: 'center',
              gap: '24px',
            }}>
              {/* Nhà Trai Map */}
              <FadeIn>
                <p style={{ fontSize: '12px', fontWeight: '700', color: '#c41e3a', letterSpacing: '2px', marginBottom: '10px' }}>ĐỊA ĐIỂM — NHÀ TRAI</p>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3736.5774666666944!2d106.4931335!3d20.5235405!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjDCsDMxJzI0LjgiTiAxMDbCsDI5JzM1LjMiRQ!5e0!3m2!1svi!2s!4v1776269991480!5m2!1svi!2s"
                  width="100%"
                  height="220"
                  style={{ border: '0', borderRadius: '12px', display: 'block' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <button
                  onClick={openMap}
                  style={{
                    marginTop: '12px',
                    background: '#c41e3a',
                    color: '#fff',
                    border: 'none',
                    padding: '10px 28px',
                    borderRadius: '25px',
                    fontSize: '13px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    letterSpacing: '1px'
                  }}
                >XEM CHỈ ĐƯỜNG</button>
              </FadeIn>

              {/* Nhà Gái Map */}
              <FadeIn delay={0.1}>
                <p style={{ fontSize: '12px', fontWeight: '700', color: '#c41e3a', letterSpacing: '2px', marginBottom: '10px' }}>ĐỊA ĐIỂM — NHÀ GÁI</p>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3736.716303336399!2d106.1721151!3d20.517852899999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjDCsDMxJzA0LjMiTiAxMDbCsDEwJzE5LjYiRQ!5e0!3m2!1svi!2s!4v1776269470790!5m2!1svi!2s"
                  width="100%"
                  height="220"
                  style={{ border: '0', borderRadius: '12px', display: 'block' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <button
                  onClick={() => window.open('https://maps.google.com/?q=20.5178529,106.1721151', '_blank')}
                  style={{
                    marginTop: '12px',
                    background: '#c41e3a',
                    color: '#fff',
                    border: 'none',
                    padding: '10px 28px',
                    borderRadius: '25px',
                    fontSize: '13px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    letterSpacing: '1px'
                  }}
                >XEM CHỈ ĐƯỜNG</button>
              </FadeIn>
            </section>

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
                      padding: '14px 44px 14px 18px',
                      marginBottom: '12px',
                      border: '1px solid #e0d8cc',
                      borderRadius: '25px',
                      fontSize: '13px',
                      background: '#fff url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'8\' viewBox=\'0 0 12 8\'%3E%3Cpath d=\'M1 1l5 5 5-5\' stroke=\'%23888\' stroke-width=\'1.8\' fill=\'none\' stroke-linecap=\'round\'/%3E%3C/svg%3E") no-repeat right 16px center',
                      outline: 'none',
                      fontFamily: 'inherit',
                      appearance: 'none',
                      color: formData.select_1 ? '#333' : '#999',
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
                  <select
                    name="banCoDau"
                    value={formData.banCoDau}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '14px 44px 14px 18px',
                      marginBottom: '12px',
                      border: '1px solid #e0d8cc',
                      borderRadius: '25px',
                      fontSize: '13px',
                      background: '#fff url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'8\' viewBox=\'0 0 12 8\'%3E%3Cpath d=\'M1 1l5 5 5-5\' stroke=\'%23888\' stroke-width=\'1.8\' fill=\'none\' stroke-linecap=\'round\'/%3E%3C/svg%3E") no-repeat right 16px center',
                      outline: 'none',
                      fontFamily: 'inherit',
                      appearance: 'none',
                      color: formData.banCoDau ? '#333' : '#999',
                    }}
                  >
                    <option value="">Bạn là bạn của ai?</option>
                    <option value="bride">Bạn của cô dâu</option>
                    <option value="groom">Bạn của chú rể</option>
                  </select>

                  {submitStatus === 'success' && (
                    <p style={{ color: '#2e7d32', fontSize: '13px', marginBottom: '10px', fontWeight: '600' }}>
                      ✅ Cảm ơn bạn đã xác nhận! Chúc mừng tiệc cưới! 🎉
                    </p>
                  )}
                  {submitStatus === 'error' && (
                    <p style={{ color: '#c41e3a', fontSize: '13px', marginBottom: '10px' }}>
                      Có lỗi xảy ra, vui lòng thử lại!
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={submitting}
                    style={{
                      width: '100%',
                      padding: '14px',
                      background: submitting
                        ? '#aaa'
                        : 'linear-gradient(135deg, #c41e3a 0%, #8b0000 100%)',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '25px',
                      fontSize: '14px',
                      fontWeight: '600',
                      cursor: submitting ? 'not-allowed' : 'pointer',
                      marginTop: '5px',
                      letterSpacing: '1px'
                    }}
                  >
                    {submitting ? 'Đang gửi...' : 'GỬI XÁC NHẬN'}
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
                  columns: '2',
                  columnGap: '8px',
                  width: '100%'
                }}>
                  {[
                    { src: IMAGES.gallery1, h: 'tall', anim: { initial: { opacity: 0, x: -30 }, animate: { opacity: 1, x: 0 } } },
                    { src: IMAGES.gallery2, h: 'normal', anim: { initial: { opacity: 0, scale: 0.8 }, animate: { opacity: 1, scale: 1 } } },
                    { src: IMAGES.gallery3, h: 'normal', anim: { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 } } },
                    { src: IMAGES.gallery4, h: 'normal', anim: { initial: { opacity: 0, x: 30 }, animate: { opacity: 1, x: 0 } } },
                    { src: IMAGES.gallery5, h: 'wide', anim: { initial: { opacity: 0, y: -30 }, animate: { opacity: 1, y: 0 } } },
                    { src: IMAGES.gallery6, h: 'normal', anim: { initial: { opacity: 0, rotate: -3 }, animate: { opacity: 1, rotate: 0 } } },
                    { src: IMAGES.gallery7, h: 'normal', anim: { initial: { opacity: 0, scale: 1.1 }, animate: { opacity: 1, scale: 1 } } },
                    { src: IMAGES.gallery8, h: 'normal', anim: { initial: { opacity: 0, x: -20, y: 20 }, animate: { opacity: 1, x: 0, y: 0 } } },
                  ].map((img, i) => (
                    <motion.div
                      key={i}
                      initial={img.anim.initial}
                      whileInView={img.anim.animate}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' }}
                      style={{ breakInside: 'avoid', marginBottom: '8px' }}
                    >
                      <img src={img.src} alt="" style={{
                        width: '100%',
                        borderRadius: '8px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                        display: 'block'
                      }} />
                    </motion.div>
                  ))}
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
                  maxWidth: '280px',
                  textAlign: 'center',
                  marginLeft: 'auto',
                  marginRight: 'auto'
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
                      src="/tkChuRe.png"
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
                      CTK: Tăng Văn Long<strong></strong><br />
                      STK: 0384086722<br />
                      MB
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
                      src="/tkCoDau.png"
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
                      CTK: <strong>Trần Thị Dinh</strong><br />
                      STK: 19035967543011<br />
                      Techcombank
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
