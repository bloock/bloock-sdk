#ifndef BloockBridge_HPP
#define BloockBridge_HPP
#include <stdint.h>
#include <stddef.h>
#include <stdbool.h>
#include <algorithm>
#include <memory>
#include <variant>
#include <optional>
#include "diplomat_runtime.hpp"

namespace capi {
#include "BloockBridge.h"
}


/**
 * A destruction policy for using BloockBridge with std::unique_ptr.
 */
struct BloockBridgeDeleter {
  void operator()(capi::BloockBridge* l) const noexcept {
    capi::BloockBridge_destroy(l);
  }
};
struct BloockBridge {
 public:
  size_t _phantom;
  template<typename W> static diplomat::result<std::monostate, std::monostate> request_to_writeable(const std::string_view request_type, const std::string_view payload, W& response);
  static diplomat::result<std::string, std::monostate> request(const std::string_view request_type, const std::string_view payload);
};


template<typename W> inline diplomat::result<std::monostate, std::monostate> BloockBridge::request_to_writeable(const std::string_view request_type, const std::string_view payload, W& response) {
  capi::DiplomatWriteable response_writer = diplomat::WriteableTrait<W>::Construct(response);
  auto diplomat_result_raw_out_value = capi::BloockBridge_request(request_type.data(), request_type.size(), payload.data(), payload.size(), &response_writer);
  diplomat::result<std::monostate, std::monostate> diplomat_result_out_value;
  if (diplomat_result_raw_out_value.is_ok) {
    diplomat_result_out_value = diplomat::Ok(std::monostate());
  } else {
    diplomat_result_out_value = diplomat::Err(std::monostate());
  }
  return diplomat_result_out_value;
}
inline diplomat::result<std::string, std::monostate> BloockBridge::request(const std::string_view request_type, const std::string_view payload) {
  std::string diplomat_writeable_string;
  capi::DiplomatWriteable diplomat_writeable_out = diplomat::WriteableFromString(diplomat_writeable_string);
  auto diplomat_result_raw_out_value = capi::BloockBridge_request(request_type.data(), request_type.size(), payload.data(), payload.size(), &diplomat_writeable_out);
  diplomat::result<std::monostate, std::monostate> diplomat_result_out_value;
  if (diplomat_result_raw_out_value.is_ok) {
    diplomat_result_out_value = diplomat::Ok(std::monostate());
  } else {
    diplomat_result_out_value = diplomat::Err(std::monostate());
  }
  return diplomat_result_out_value.replace_ok(std::move(diplomat_writeable_string));
}
#endif
