``ffi``
=======

.. cpp:struct:: BloockBridge

    .. cpp:member:: size_t _phantom

    .. cpp:function:: template<typename W> static diplomat::result<std::monostate, std::monostate> request_to_writeable(const std::string_view request_type, const std::string_view payload, W& response)

    .. cpp:function:: static diplomat::result<std::string, std::monostate> request(const std::string_view request_type, const std::string_view payload)
