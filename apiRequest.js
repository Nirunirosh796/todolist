const apiRequest = async (url = '', optionObj = null, errMsg = null) => {
    try {
        const response = await fetch(url, optionObj);
        if (!response.ok) {
            const errorDetail = await response.json(); // Get more details about the error
            throw Error(`Error: ${errorDetail.message || response.statusText}`);
        }
    } catch (error) {
        errMsg = error.message;
    } finally {
        return errMsg;
    }
}
export default apiRequest;
