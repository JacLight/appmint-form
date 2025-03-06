import React, { useState, useRef, useEffect } from 'react';

const SignatureComponent = () => {
    const [signatureMethod, setSignatureMethod] = useState('draw'); // 'draw' or 'type'
    const [typedName, setTypedName] = useState('');
    const [hasSignature, setHasSignature] = useState(false);
    const [isAccepted, setIsAccepted] = useState(false);
    const [canvasDataURL, setCanvasDataURL] = useState('');
    const [currentDate, setCurrentDate] = useState('');
    const [securityStamp, setSecurityStamp] = useState('');
    const [signatureHash, setSignatureHash] = useState('');

    const canvasRef = useRef(null);
    const canvasCtxRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);

    // Initialize canvas and date when component mounts
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

        // Setup canvas if in draw mode
        setupCanvas();

        // Add resize listener
        window.addEventListener('resize', setupCanvas);

        return () => {
            window.removeEventListener('resize', setupCanvas);
        };
    }, []);

    // Setup canvas whenever signatureMethod changes
    useEffect(() => {
        setupCanvas();
    }, [signatureMethod]);

    const setupCanvas = () => {
        if (signatureMethod !== 'draw') return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        // Make canvas responsive
        const parentWidth = canvas.parentElement?.clientWidth || 300;
        canvas.width = parentWidth;
        canvas.height = 200;

        const ctx = canvas.getContext('2d');
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        ctx.strokeStyle = 'black';
        canvasCtxRef.current = ctx;

        // Only clear the canvas if there's no existing signature or on initial setup
        if (!canvasDataURL) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        } else {
            // Redraw existing signature
            const img = new Image();
            img.onload = function () {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            };
            img.src = canvasDataURL;
        }
    };

    // Function to generate a unique security stamp
    const generateSecurityStamp = () => {
        const timestamp = Date.now().toString();
        const randomChars = Math.random().toString(36).substring(2, 8).toUpperCase();
        return `SEC-${randomChars}-${timestamp.slice(-6)}`;
    };

    // Function to generate a verifiable hash from signature data
    const generateHash = (data) => {
        // In a real implementation, you would use a proper hashing algorithm like SHA-256
        // This is a simplified version for demonstration purposes
        const signatureData = data.signature || '';
        const dateStr = data.date || '';
        const securityCode = data.securityStamp || '';

        // Combine all data for hashing
        const combined = signatureData + dateStr + securityCode;

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

    // Function to verify a hash (would be used in a separate verification component)
    const verifyHash = (data, providedHash) => {
        const calculatedHash = generateHash(data);
        return calculatedHash === providedHash;
    };

    // Drawing functions
    const startDrawing = (e) => {
        const { offsetX, offsetY } = getCoordinates(e);
        canvasCtxRef.current.beginPath();
        canvasCtxRef.current.moveTo(offsetX, offsetY);
        setIsDrawing(true);
    };

    const draw = (e) => {
        if (!isDrawing) return;

        const { offsetX, offsetY } = getCoordinates(e);
        canvasCtxRef.current.lineTo(offsetX, offsetY);
        canvasCtxRef.current.stroke();
        setHasSignature(true);
    };

    const stopDrawing = () => {
        if (isDrawing) {
            canvasCtxRef.current.closePath();
            setIsDrawing(false);

            // Save the current canvas state
            const canvas = canvasRef.current;
            if (canvas) {
                setCanvasDataURL(canvas.toDataURL());
            }
        }
    };

    // Handle touch events
    const getCoordinates = (e) => {
        if (!canvasRef.current) return { offsetX: 0, offsetY: 0 };

        if (e.nativeEvent.touches) {
            const rect = canvasRef.current.getBoundingClientRect();
            return {
                offsetX: e.nativeEvent.touches[0].clientX - rect.left,
                offsetY: e.nativeEvent.touches[0].clientY - rect.top
            };
        }
        return {
            offsetX: e.nativeEvent.offsetX,
            offsetY: e.nativeEvent.offsetY
        };
    };

    // Handle typed signature
    const handleTypedNameChange = (e) => {
        setTypedName(e.target.value);
        setHasSignature(e.target.value.trim() !== '');
    };

    // Handle signature method change
    const changeSignatureMethod = (method) => {
        setSignatureMethod(method);
        setHasSignature(method === 'type' ? typedName.trim() !== '' : canvasDataURL !== '');
    };

    // Reset signature
    const handleRetry = () => {
        if (signatureMethod === 'draw') {
            const ctx = canvasCtxRef.current;
            if (ctx && canvasRef.current) {
                ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
                setCanvasDataURL('');
            }
        } else {
            setTypedName('');
        }
        setHasSignature(false);
        setIsAccepted(false);
        setSignatureHash('');
    };

    // Handle accept
    const handleAccept = () => {
        // Only accept if there is a signature
        if (!hasSignature) return;

        setIsAccepted(true);

        // Generate a new security stamp when accepting
        const newStamp = generateSecurityStamp();
        setSecurityStamp(newStamp);

        // Prepare signature data
        const signatureData = {
            signature: signatureMethod === 'draw' ? canvasDataURL : typedName,
            date: currentDate,
            securityStamp: newStamp
        };

        // Generate hash from the signature data
        const hash = generateHash(signatureData);
        setSignatureHash(hash);

        // Log signature data
        console.log('Signature accepted', {
            type: signatureMethod,
            ...signatureData,
            hash: hash
        });
    };

    // Change signature (go back to editing but preserve the current signature)
    const handleChangeSignature = () => {
        setIsAccepted(false);
    };

    return (
        <div className="max-w-md w-full mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Signature</h2>

            <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded-md mb-3">
                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">Signature Information</h3>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                    <div>{currentDate}</div>
                </div>
            </div>

            {!isAccepted ? (
                <>
                    <div className="flex mb-4 bg-gray-100 dark:bg-gray-700 rounded-md overflow-hidden">
                        <button
                            className={`flex-1 py-2 ${signatureMethod === 'draw' ? 'bg-blue-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
                            onClick={() => changeSignatureMethod('draw')}
                        >
                            Draw Signature
                        </button>
                        <button
                            className={`flex-1 py-2 ${signatureMethod === 'type' ? 'bg-blue-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
                            onClick={() => changeSignatureMethod('type')}
                        >
                            Type Signature
                        </button>
                    </div>

                    {signatureMethod === 'draw' ? (
                        <div className="mb-4">
                            <div className="border-2 border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900">
                                <canvas
                                    ref={canvasRef}
                                    className="w-full h-52 touch-none cursor-crosshair"
                                    onMouseDown={startDrawing}
                                    onMouseMove={draw}
                                    onMouseUp={stopDrawing}
                                    onMouseLeave={stopDrawing}
                                    onTouchStart={startDrawing}
                                    onTouchMove={draw}
                                    onTouchEnd={stopDrawing}
                                ></canvas>
                            </div>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Draw your signature above</p>
                        </div>
                    ) : (
                        <div className="mb-4">
                            <input
                                type="text"
                                className="w-full px-3 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                                placeholder="Type your full name"
                                value={typedName}
                                onChange={handleTypedNameChange}
                            />
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Type your full name above</p>
                        </div>
                    )}

                    <div className="flex space-x-2">
                        <button
                            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md disabled:opacity-50 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                            onClick={handleRetry}
                            disabled={!hasSignature}
                        >
                            Clear
                        </button>
                        <button
                            className="flex-1 px-4 py-2 bg-green-500 dark:bg-green-600 text-white rounded-md disabled:opacity-50 hover:bg-green-600 dark:hover:bg-green-700 transition-colors"
                            onClick={handleAccept}
                            disabled={!hasSignature}
                        >
                            Accept Signature
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
                            {signatureMethod === 'draw' ? (
                                <div className="flex justify-center">
                                    <img src={canvasDataURL} alt="Your signature" className="max-h-32" />
                                </div>
                            ) : (
                                <p className="text-xl font-signature text-center text-gray-900 dark:text-gray-100">{typedName}</p>
                            )}

                            <div className="border-t border-gray-200 dark:border-gray-700 pt-3 mt-1">
                                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                                    <span>{currentDate}</span>
                                </div>
                                <div className="bg-gray-50 dark:bg-gray-800 rounded-md p-2 text-xs">
                                    <div className="flex justify-between mb-2">
                                        <span className="text-gray-500 dark:text-gray-400">Security ID:</span>
                                        <span className="font-mono text-gray-700 dark:text-gray-300">{securityStamp}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-gray-500 dark:text-gray-400 mb-1">Verification Hash:</span>
                                        <span className="font-mono text-gray-700 dark:text-gray-300 break-all">{signatureHash}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <p className="text-green-500 dark:text-green-400 mb-4">Signature accepted with secure verification!</p>
                    <button
                        className="px-4 py-2 bg-blue-500 dark:bg-blue-600 text-white rounded-md hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors"
                        onClick={handleChangeSignature}
                    >
                        Change Signature
                    </button>
                </div>
            )}
        </div>
    );
};

export default SignatureComponent;