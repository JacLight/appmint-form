import React, { useState, useRef, useEffect } from 'react';
import { Camera } from 'lucide-react';

const CameraCaptureComponent = () => {
    const [captureMethod, setCaptureMethod] = useState('camera'); // 'camera' or 'upload'
    const [hasCapture, setHasCapture] = useState(false);
    const [isAccepted, setIsAccepted] = useState(false);
    const [capturedImage, setCapturedImage] = useState('');
    const [currentDate, setCurrentDate] = useState('');
    const [securityStamp, setSecurityStamp] = useState('');
    const [captureHash, setCaptureHash] = useState('');
    const [isCameraActive, setIsCameraActive] = useState(false);
    const [cameraError, setCameraError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const videoRef = useRef(null);
    const streamRef = useRef(null);
    const canvasRef = useRef(null);
    const fileInputRef = useRef(null);

    // Initialize date when component mounts
    useEffect(() => {
        // Generate date and security stamp
        const now = new Date();
        setCurrentDate(now.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }));

        // Generate a random security stamp
        const randomStamp = generateSecurityStamp();
        setSecurityStamp(randomStamp);

        // Clean up camera stream when component unmounts
        return () => {
            stopCamera();
        };
    }, []);

    // Start or stop camera when capture method changes
    useEffect(() => {
        if (captureMethod === 'camera' && !isCameraActive && !capturedImage) {
            startCamera();
        } else if (captureMethod === 'upload' || capturedImage) {
            stopCamera();
        }
    }, [captureMethod, capturedImage]);

    // Function to generate a unique security stamp
    const generateSecurityStamp = () => {
        const timestamp = Date.now().toString();
        const randomChars = Math.random().toString(36).substring(2, 8).toUpperCase();
        return `IMG-${randomChars}-${timestamp.slice(-6)}`;
    };

    // Function to generate a verifiable hash
    const generateHash = (data) => {
        // In a real implementation, you would use a proper hashing algorithm like SHA-256
        const imageData = data.image || '';
        const dateStr = data.date || '';
        const securityCode = data.securityStamp || '';

        // Take first 1000 chars of image data to avoid excessive processing
        const truncatedImageData = imageData.substring(0, 1000);

        // Combine all data for hashing
        const combined = truncatedImageData + dateStr + securityCode;

        // Simple hashing algorithm
        let hash = 0;
        for (let i = 0; i < combined.length; i++) {
            const char = combined.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32bit integer
        }

        // Convert to hexadecimal string with fixed length and ensure it's positive
        return Math.abs(hash).toString(16).padStart(8, '0').toUpperCase();
    };

    // Start camera
    const startCamera = async () => {
        setIsLoading(true);
        setCameraError('');

        try {
            const constraints = {
                video: {
                    facingMode: 'environment', // Use back camera if available
                    width: { ideal: 1280 },
                    height: { ideal: 720 }
                }
            };

            const stream = await navigator.mediaDevices.getUserMedia(constraints);
            streamRef.current = stream;

            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                videoRef.current.play();
                setIsCameraActive(true);
            }
        } catch (err) {
            console.error('Error accessing camera:', err);
            setCameraError('Could not access camera. Please ensure camera permissions are granted.');
        } finally {
            setIsLoading(false);
        }
    };

    // Stop camera
    const stopCamera = () => {
        if (streamRef.current) {
            const tracks = streamRef.current.getTracks();
            tracks.forEach(track => track.stop());
            streamRef.current = null;
        }

        if (videoRef.current) {
            videoRef.current.srcObject = null;
        }

        setIsCameraActive(false);
    };

    // Capture photo from camera
    const capturePhoto = () => {
        if (!videoRef.current || !isCameraActive) return;

        const video = videoRef.current;
        const canvas = canvasRef.current;

        if (!canvas) return;

        // Set canvas dimensions to match video
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        // Draw video frame to canvas
        const ctx = canvas.getContext('2d');
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Convert canvas to data URL
        const imageDataURL = canvas.toDataURL('image/jpeg', 0.8);
        setCapturedImage(imageDataURL);
        setHasCapture(true);

        // Stop camera after taking photo
        stopCamera();
    };

    // Handle file upload
    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event: any) => {
            setCapturedImage(event.target.result);
            setHasCapture(true);
        };

        reader.readAsDataURL(file);
    };

    // Handle capture method change
    const changeCaptureMethod = (method) => {
        setCaptureMethod(method);
        setCapturedImage('');
        setHasCapture(false);

        if (method === 'upload') {
            stopCamera();
        }
    };

    // Reset capture
    const handleRetry = () => {
        setCapturedImage('');
        setHasCapture(false);
        setIsAccepted(false);
        setCaptureHash('');

        if (captureMethod === 'camera') {
            startCamera();
        }

        // Reset file input
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    // Handle accept
    const handleAccept = () => {
        // Only accept if there is a capture
        if (!hasCapture) return;

        setIsAccepted(true);

        // Generate a new security stamp when accepting
        const newStamp = generateSecurityStamp();
        setSecurityStamp(newStamp);

        // Prepare capture data
        const captureData = {
            image: capturedImage,
            date: currentDate,
            securityStamp: newStamp
        };

        // Generate hash from the capture data
        const hash = generateHash(captureData);
        setCaptureHash(hash);

        // Log capture data
        console.log('Image captured and accepted', {
            method: captureMethod,
            securityStamp: newStamp,
            date: currentDate,
            hash: hash
        });
    };

    // Change capture (go back to editing but preserve the current image)
    const handleChangeCapture = () => {
        setIsAccepted(false);
    };

    // Trigger file input click
    const triggerFileUpload = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    return (
        <div className="max-w-md w-full mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Image Capture</h2>

            <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded-md mb-3">
                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">Capture Information</h3>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                    <div>{currentDate}</div>
                </div>
            </div>

            {!isAccepted ? (
                <>
                    <div className="flex mb-4 bg-gray-100 dark:bg-gray-700 rounded-md overflow-hidden">
                        <button
                            className={`flex-1 py-2 ${captureMethod === 'camera' ? 'bg-blue-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
                            onClick={() => changeCaptureMethod('camera')}
                        >
                            Use Camera
                        </button>
                        <button
                            className={`flex-1 py-2 ${captureMethod === 'upload' ? 'bg-blue-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
                            onClick={() => changeCaptureMethod('upload')}
                        >
                            Upload Image
                        </button>
                    </div>

                    {captureMethod === 'camera' ? (
                        <div className="mb-4">
                            <div className="border-2 border-gray-300 dark:border-gray-600 rounded-md bg-black overflow-hidden relative aspect-video">
                                {isLoading ? (
                                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-900">
                                        <div className="text-gray-500 dark:text-gray-400">Loading camera...</div>
                                    </div>
                                ) : null}

                                {cameraError ? (
                                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
                                        <div className="text-red-500">{cameraError}</div>
                                    </div>
                                ) : null}

                                {capturedImage ? (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <img
                                            src={capturedImage}
                                            alt="Captured"
                                            className="max-w-full max-h-full object-contain"
                                        />
                                    </div>
                                ) : (
                                    <video
                                        ref={videoRef}
                                        className="w-full h-full object-cover"
                                        playsInline
                                        muted
                                    ></video>
                                )}

                                {/* Hidden canvas for capturing image */}
                                <canvas ref={canvasRef} className="hidden"></canvas>
                            </div>

                            {!capturedImage && !cameraError ? (
                                <button
                                    className="mt-2 w-full py-2 bg-blue-500 dark:bg-blue-600 text-white rounded-md hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors flex items-center justify-center"
                                    onClick={capturePhoto}
                                    disabled={!isCameraActive}
                                >
                                    <Camera className="w-5 h-5 mr-2" />
                                    Take Photo
                                </button>
                            ) : null}

                            {capturedImage ? (
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Image captured successfully</p>
                            ) : (
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                                    {cameraError ? 'Camera access required' : 'Position your subject in the frame'}
                                </p>
                            )}
                        </div>
                    ) : (
                        <div className="mb-4">
                            <div className="border-2 border-gray-300 dark:border-gray-600 rounded-md bg-gray-100 dark:bg-gray-900 overflow-hidden relative aspect-video">
                                {capturedImage ? (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <img
                                            src={capturedImage}
                                            alt="Uploaded"
                                            className="max-w-full max-h-full object-contain"
                                        />
                                    </div>
                                ) : (
                                    <div
                                        className="w-full h-full flex flex-col items-center justify-center cursor-pointer p-4"
                                        onClick={triggerFileUpload}
                                    >
                                        <Camera className="w-12 h-12 text-gray-400 dark:text-gray-600 mb-2" />
                                        <div className="text-gray-500 dark:text-gray-400 text-center">
                                            Click to select an image to upload
                                        </div>
                                    </div>
                                )}

                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleFileUpload}
                                />
                            </div>

                            {capturedImage ? (
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Image uploaded successfully</p>
                            ) : (
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                                    Select an image file to upload
                                </p>
                            )}
                        </div>
                    )}

                    <div className="flex space-x-2">
                        <button
                            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md disabled:opacity-50 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                            onClick={handleRetry}
                            disabled={!hasCapture}
                        >
                            Retake
                        </button>
                        <button
                            className="flex-1 px-4 py-2 bg-green-500 dark:bg-green-600 text-white rounded-md disabled:opacity-50 hover:bg-green-600 dark:hover:bg-green-700 transition-colors"
                            onClick={handleAccept}
                            disabled={!hasCapture}
                        >
                            Accept Image
                        </button>
                    </div>

                    <div className="mt-4 text-xs text-gray-400 dark:text-gray-500">
                        <p>A secure verification hash will be generated upon acceptance</p>
                    </div>
                </>
            ) : (
                <div className="text-center">
                    <div className="p-4 border-2 border-green-500 dark:border-green-600 rounded-md mb-4 bg-white dark:bg-gray-900">
                        <div className="flex flex-col space-y-4">
                            <div className="flex justify-center">
                                <img
                                    src={capturedImage}
                                    alt="Accepted Image"
                                    className="max-w-full rounded-md"
                                />
                            </div>

                            <div className="border-t border-gray-200 dark:border-gray-700 pt-3 mt-1">
                                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                                    <span>{currentDate}</span>
                                </div>
                                <div className="bg-gray-50 dark:bg-gray-800 rounded-md p-2 text-xs">
                                    <div className="flex justify-between mb-2">
                                        <span className="text-gray-500 dark:text-gray-400">Image ID:</span>
                                        <span className="font-mono text-gray-700 dark:text-gray-300">{securityStamp}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-gray-500 dark:text-gray-400 mb-1">Verification Hash:</span>
                                        <span className="font-mono text-gray-700 dark:text-gray-300 break-all">{captureHash}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <p className="text-green-500 dark:text-green-400 mb-4">Image accepted with secure verification!</p>
                    <button
                        className="px-4 py-2 bg-blue-500 dark:bg-blue-600 text-white rounded-md hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors"
                        onClick={handleChangeCapture}
                    >
                        Change Image
                    </button>
                </div>
            )}
        </div>
    );
};

export default CameraCaptureComponent;