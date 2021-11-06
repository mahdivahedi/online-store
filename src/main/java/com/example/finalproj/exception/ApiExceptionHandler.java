package com.example.finalproj.exception;

import com.example.finalproj.dto.response.BaseResponse;
import com.example.finalproj.dto.response.ErrorResponse;
import org.springframework.beans.ConversionNotSupportedException;
import org.springframework.beans.TypeMismatchException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.http.converter.HttpMessageNotWritableException;
import org.springframework.validation.BindException;
import org.springframework.web.HttpMediaTypeNotAcceptableException;
import org.springframework.web.HttpMediaTypeNotSupportedException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingPathVariableException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.ServletRequestBindingException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.context.request.async.AsyncRequestTimeoutException;
import org.springframework.web.multipart.support.MissingServletRequestPartException;
import org.springframework.web.servlet.NoHandlerFoundException;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import javax.servlet.http.HttpServletRequest;

@ControllerAdvice
public class ApiExceptionHandler extends ResponseEntityExceptionHandler {

    @Override
    protected ResponseEntity<Object> handleHttpRequestMethodNotSupported(HttpRequestMethodNotSupportedException ex,
                                                                         HttpHeaders headers,
                                                                         HttpStatus status,
                                                                         WebRequest request) {
        return new ResponseEntity<>(new ErrorResponse(5), HttpStatus.METHOD_NOT_ALLOWED);
    }

    @Override
    protected ResponseEntity<Object> handleHttpMediaTypeNotSupported(HttpMediaTypeNotSupportedException ex,
                                                                     HttpHeaders headers,
                                                                     HttpStatus status,
                                                                     WebRequest request) {
        return new ResponseEntity<>(new ErrorResponse(6), HttpStatus.BAD_REQUEST);
    }

    @Override
    protected ResponseEntity<Object> handleHttpMediaTypeNotAcceptable(HttpMediaTypeNotAcceptableException ex,
                                                                      HttpHeaders headers,
                                                                      HttpStatus status,
                                                                      WebRequest request) {
        return new ResponseEntity<>(new ErrorResponse(7), HttpStatus.BAD_REQUEST);
    }

    @Override
    protected ResponseEntity<Object> handleMissingPathVariable(MissingPathVariableException ex,
                                                               HttpHeaders headers,
                                                               HttpStatus status,
                                                               WebRequest request) {
        return new ResponseEntity<>(new ErrorResponse(6), HttpStatus.BAD_REQUEST);
    }

    @Override
    protected ResponseEntity<Object> handleMissingServletRequestParameter(MissingServletRequestParameterException ex,
                                                                          HttpHeaders headers,
                                                                          HttpStatus status,
                                                                          WebRequest request) {
        return new ResponseEntity<>(new ErrorResponse(7), HttpStatus.BAD_REQUEST);
    }

    @Override
    protected ResponseEntity<Object> handleServletRequestBindingException(ServletRequestBindingException ex,
                                                                          HttpHeaders headers,
                                                                          HttpStatus status,
                                                                          WebRequest request) {
        return new ResponseEntity<>(new ErrorResponse(2), HttpStatus.BAD_REQUEST);
    }

    @Override
    protected ResponseEntity<Object> handleConversionNotSupported(ConversionNotSupportedException ex,
                                                                  HttpHeaders headers,
                                                                  HttpStatus status,
                                                                  WebRequest request) {
        return new ResponseEntity<>(new ErrorResponse(2), HttpStatus.BAD_REQUEST);
    }

    @Override
    protected ResponseEntity<Object> handleTypeMismatch(TypeMismatchException ex,
                                                        HttpHeaders headers,
                                                        HttpStatus status,
                                                        WebRequest request) {
        return new ResponseEntity<>(new ErrorResponse(2), HttpStatus.BAD_REQUEST);
    }

    @Override
    protected ResponseEntity<Object> handleHttpMessageNotReadable(HttpMessageNotReadableException ex,
                                                                  HttpHeaders headers,
                                                                  HttpStatus status,
                                                                  WebRequest request) {
        return new ResponseEntity<>(new ErrorResponse(2), HttpStatus.BAD_REQUEST);
    }

    @Override
    protected ResponseEntity<Object> handleHttpMessageNotWritable(HttpMessageNotWritableException ex,
                                                                  HttpHeaders headers,
                                                                  HttpStatus status,
                                                                  WebRequest request) {
        return new ResponseEntity<>(new ErrorResponse(2), HttpStatus.BAD_REQUEST);
    }

    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex,
                                                                  HttpHeaders headers,
                                                                  HttpStatus status,
                                                                  WebRequest request) {
        return new ResponseEntity<>(new ErrorResponse(2), HttpStatus.BAD_REQUEST);
    }

    @Override
    protected ResponseEntity<Object> handleMissingServletRequestPart(MissingServletRequestPartException ex,
                                                                     HttpHeaders headers,
                                                                     HttpStatus status,
                                                                     WebRequest request) {
        return new ResponseEntity<>(new ErrorResponse(2), HttpStatus.BAD_REQUEST);
    }

    @Override
    protected ResponseEntity<Object> handleBindException(BindException ex,
                                                         HttpHeaders headers,
                                                         HttpStatus status,
                                                         WebRequest request) {
        return new ResponseEntity<>(new ErrorResponse(2), HttpStatus.BAD_REQUEST);
    }

    @Override
    protected ResponseEntity<Object> handleNoHandlerFoundException(NoHandlerFoundException ex,
                                                                   HttpHeaders headers,
                                                                   HttpStatus status,
                                                                   WebRequest request) {
        return new ResponseEntity<>(new ErrorResponse(2), HttpStatus.BAD_REQUEST);
    }

    @Override
    protected ResponseEntity<Object> handleAsyncRequestTimeoutException(AsyncRequestTimeoutException ex,
                                                                        HttpHeaders headers,
                                                                        HttpStatus status,
                                                                        WebRequest webRequest) {
        return new ResponseEntity<>(new ErrorResponse(2), HttpStatus.BAD_REQUEST);
    }

    @Override
    protected ResponseEntity<Object> handleExceptionInternal(Exception ex,
                                                             Object body,
                                                             HttpHeaders headers,
                                                             HttpStatus status,
                                                             WebRequest request) {
        return new ResponseEntity<>(new ErrorResponse(3), HttpStatus.BAD_REQUEST);
    }


    @ExceptionHandler(value = Throwable.class)
    public ResponseEntity<BaseResponse> handleAllUncaughtException(Throwable throwable, HttpServletRequest servletRequest) {
        return new ResponseEntity<>(new ErrorResponse(404
                , throwable.getCause().getMessage()), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(value = {RepeatedException.class})
    public ResponseEntity<BaseResponse> handleApiRequestException(RepeatedException re) {
        return new ResponseEntity<>(new ErrorResponse(re.getResponseCode()), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(value = {NotFoundObjectException.class})
    public ResponseEntity<BaseResponse> handleApiRequestException(NotFoundObjectException ne) {
        return new ResponseEntity<>(new ErrorResponse(9), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(value = {EmailException.class})
    public ResponseEntity<BaseResponse> handleApiRequestException(EmailException ee) {
        return new ResponseEntity<>(new ErrorResponse(4), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(value = {DatabaseException.class})
    public ResponseEntity<BaseResponse> handleApiRequestException(DatabaseException de) {
        return new ResponseEntity<>(new ErrorResponse(6), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(value = {NullValueException.class})
    public ResponseEntity<BaseResponse> handleApiRequestException(NullValueException ne) {
        return new ResponseEntity<>(new ErrorResponse(ne.getResponseCode()), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(value = {LoginAuthenticationException.class})
    public ResponseEntity<BaseResponse> handleApiRequestException(LoginAuthenticationException le) {
        return new ResponseEntity<>(new ErrorResponse(13), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(value = {MoneyAmountException.class})
    public ResponseEntity<BaseResponse> handleApiRequestException(MoneyAmountException me) {
        return new ResponseEntity<>(new ErrorResponse(14), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(value = {LowInventoryProductException.class})
    public ResponseEntity<BaseResponse> handleApiRequestException(LowInventoryProductException le) {
        return new ResponseEntity<>(new ErrorResponse(15), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(value = {ForeignKeyException.class})
    public ResponseEntity<BaseResponse> handleApiRequestException(ForeignKeyException le) {
        return new ResponseEntity<>(new ErrorResponse(16), HttpStatus.BAD_REQUEST);
    }
}
