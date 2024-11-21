

export function Skeletyon() {

    return (
        <div className='animate__animated animate__fadeIn cursor-pointer card  shadow-lg flex items-center rounded-xl flex-col w-40'  >
            <div className="border-gray-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
                <div className="animate-pulse flex flex-col space-x-4">
                    <div className="flex flex-col items-center py-2">
                        <div className="rounded-full bg-gray-400 h-16 w-16"></div>
                    </div>
                    <div className="flex-1 mt-8" style={{ marginLeft: '0px' }}>
                        <div className="flex justify-between">
                            <div className="h-4 bg-gray-400 rounded w-1/3"></div>
                            <div className="h-4 bg-gray-400 rounded w-1/3"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}