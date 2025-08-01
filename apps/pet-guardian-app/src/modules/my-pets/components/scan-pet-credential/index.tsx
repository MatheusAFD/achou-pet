'use client'

import { useRef, useState, useEffect } from 'react'

import Image from 'next/image'

import { CameraOff, ScanQrCode } from 'lucide-react'
import QrScanner from 'qr-scanner'
import { toast } from 'sonner'

import { ScanCamera } from '@user-app/modules/@shared/assets'
import { Button, Conditional } from '@user-app/modules/@shared/components'
import { useSteps } from '@user-app/modules/@shared/hooks'

import { getPetCredential } from '../../services'
import { AttachCredentialFormSteps } from '../../types'

interface ScanPetCredentialProps {
  onFindCredential: (credentialId: string | null) => void
}

export const ScanPetCredential = (props: ScanPetCredentialProps) => {
  const { onFindCredential } = props

  const videoRef = useRef<HTMLVideoElement | null>(null)

  const [cameraError, setCameraError] = useState<string | null>(null)
  const [isScanning, setIsScanning] = useState(false)

  const { updateFormStep } = useSteps<AttachCredentialFormSteps>()

  useEffect(() => {
    if (!isScanning) {
      return
    }

    let scanner: QrScanner | null = null
    const localVideoRef = videoRef.current
    let handled = false

    const handleCloseCamera = () => {
      scanner?.stop()
      setIsScanning(false)
    }

    const initializeCameraStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: { ideal: 'environment' } }
        })
        if (localVideoRef) {
          localVideoRef.srcObject = stream
          localVideoRef.onloadedmetadata = () => {
            localVideoRef.play()
          }
        }
        scanner = new QrScanner(localVideoRef!, async (result) => {
          if (handled) {
            return
          }

          handled = true
          if (
            result &&
            (typeof result === 'string' ||
              (typeof result === 'object' && 'data' in result))
          ) {
            const url = typeof result === 'string' ? result : null

            const param = url?.substring(url.lastIndexOf('/') + 1)

            const [error, response] = await getPetCredential(param as string)

            if (error) {
              toast.error('Erro ao buscar Tag')

              handleCloseCamera()

              return
            }

            if (response?.status === 'ACTIVE') {
              toast.warning('Tag já vínculada a um pet.')

              handleCloseCamera()

              return
            }

            onFindCredential(param as string)

            toast.success('QR Code escaneado com sucesso')

            handleCloseCamera()

            updateFormStep(AttachCredentialFormSteps.PetData)

            return
          }
          toast.warning('QR Code não reconhecido')

          handleCloseCamera()

          if (localVideoRef && localVideoRef.srcObject) {
            const tracks = (localVideoRef.srcObject as MediaStream).getTracks()
            tracks.forEach((track) => track.stop())
            localVideoRef.srcObject = null
          }
        })
        scanner.start()
      } catch (err) {
        if (
          err &&
          typeof err === 'object' &&
          err !== null &&
          'name' in err &&
          (err as { name?: string }).name === 'NotAllowedError'
        ) {
          setCameraError('Permissão da câmera negada pelo usuário')
        } else {
          setCameraError('Permissão da câmera negada ou não disponível')
        }
        setIsScanning(false)
      }
    }

    initializeCameraStream()

    return () => {
      scanner?.stop()
      if (localVideoRef && localVideoRef.srcObject) {
        const tracks = (localVideoRef.srcObject as MediaStream).getTracks()
        tracks.forEach((track) => track.stop())
        localVideoRef.srcObject = null
      }
    }
    // TODO: Fix eslint warning
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isScanning, updateFormStep])

  return (
    <div className="relative w-full flex flex-col gap-8 justify-center items-center">
      <h1 className="text-gray-600 text-lg font-semibold">
        1. Aponte a câmera para o QR Code
      </h1>

      <Image
        src={ScanCamera}
        quality={100}
        width={256}
        height={256}
        alt="Camera"
        priority
      />

      <Button
        onClick={() => {
          setCameraError(null)
          setIsScanning(true)
        }}
        className="mt-8"
        disabled={isScanning}
        size="lg"
      >
        <ScanQrCode />
        {isScanning ? 'Escaneando...' : 'Escanear QR Code'}
      </Button>

      <Conditional condition={!!cameraError}>
        <div className="mt-4 p-4 bg-red-100 text-red-800 rounded">
          {cameraError}
        </div>
      </Conditional>

      <Conditional condition={isScanning && !cameraError}>
        <div className="w-full fixed inset-0 top-14 flex justify-center items-center">
          <div className="relative">
            <div className=" w-full max-w-md">
              <video ref={videoRef} className="w-full h-auto" autoPlay muted />
            </div>

            <Button
              className="absolute top-2 right-2"
              size="icon"
              onClick={() => setIsScanning(false)}
            >
              <CameraOff />
            </Button>
          </div>
        </div>
      </Conditional>
    </div>
  )
}
